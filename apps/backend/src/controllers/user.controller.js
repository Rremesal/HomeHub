import { loginValidation, registerValidation } from "../validations.js";
import User from "../lib/db/schemas/user.schema.js";
import Controller from "./controller.js";
import crypto from "crypto";
import Session from "../lib/redis/index.js";
import bcrypt from "bcryptjs";
import error from "../helpers/error.js";
import { config } from "dotenv";

config();

class UserController extends Controller {
  async create(req, res) {
    const data = req.body;

    const validData = await registerValidation.validate(data);

    if (!validData) return res.status(400).json("Bad input");

    try {
      validData.fullName = `${validData.firstName} ${validData.lastName}`;
      const user = await User.create(validData);

      return res.status(201).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json(error.SOMETHING_WENT_WRONG);
    }
  }

  async login(req, res) {
    const data = req.body; 
    
    const validData = await loginValidation.validate(data);

    if (!validData) return res.status(400).json("Bad input");

    try {
      const user = await User.findOne({ email: validData.email });

      if (!await bcrypt.compare(validData.password, user.password)) {
        return res.status(500).json(error.LOGIN_ERROR);
      }

      await User.updateOne({ _id: user._id}, { last_login_at: new Date()});

      // create a session
      const sessionToken = crypto.randomUUID();
      const expiry = await new Session().createSession(sessionToken, user.id, req.ip);
      res.cookie("sid", sessionToken, { maxAge: expiry});

      return res.status(200).json("Authenticated");
    } catch (e) {
      console.log(e);
      return res.status(500).json(error.LOGIN_ERROR);
    }
  }

  async getMe(req, res) {
    const { sid } = req.cookies;

    if (!sid) return res.status(500).json(error.SOMETHING_WENT_WRONG);

    const session = await new Session().getSession(sid);

    const user = await User.findOne({ _id: session.user_id});

    if (!user) return res.status(500).json(error.SOMETHING_WENT_WRONG);

    return res.status(200).json(user);
  }

  async logout(req, res) {
    const { sid } = req.cookies;

    if (!sid) return res.status(500).json(error.SOMETHING_WENT_WRONG);

    const isDeleted = await new Session().deleteSession(sid);
    
    if (!isDeleted) return res.status(500).json(false);

    res.clearCookie("sid");
  
    return res.status(200).json(true);
  }

  async index(req, res) {
    const { id, ...searchParams } = req.query;

    let users;
    
    if (id) {
      users = await User.findOne({ _id: id });
      if (!users) return res.status(500).json(error.SOMETHING_WENT_WRONG);
      return res.status(200).json(users[0]);
    }

    const { s } = searchParams;

    const search = {};
    if (s) search.fullName = {$regex: s, $options: 'i' };

    console.log(search);

    users = await User.find(search);
    res.status(200).json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteOperation = await User.deleteOne({ _id: id});

    if (deleteOperation.deletedCount === 0) return res.status(500).json(false);
    return res.status(200).json(true);
  }
}

export default UserController;