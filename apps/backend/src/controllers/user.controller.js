
import { addMinutes } from "date-fns";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Core
import { createUserValidation, loginValidation } from "../_validations.js";
import User from "../lib/mongoose/schemas/user.schema.js";
import RedisClient from "../lib/redis/index.js";
import errors from "../utils/errors.js";

const redisClient = new RedisClient();

class UserController {
  async login(req, res) {
    try {
      const data = await loginValidation.validate(req.body);

      const user = await User.findOne({ email: data.email });

      if (!user) return res.status(500).json(errors.SOMETHING_WENT_WRONG);

      const isPasswordValid = await bcrypt.compare(data.password, user.password);

      console.log("isPasswordValid", isPasswordValid);

      if (!isPasswordValid) return res.status(500).json(errors.SOMETHING_WENT_WRONG);

      const sessionToken = crypto.randomBytes(16).toString("hex");

      redisClient.createSession(sessionToken, user.id, req.ip);

      res.cookie("sid", sessionToken, { maxAge: 30 * 60 * 1000 });

      await User.updateOne({ _id: user._id }, { last_logged_in_at: new Date()})

      return res.status(200).json(true);

    } catch (error) {
      console.log(error);
      return res.status(500).json(errors.SOMETHING_WENT_WRONG);
    }
  }

  async create(req, res) {
    try {
      const data = await createUserValidation.validate(req.body);

      const user = await User.create(data);

      console.log(user);

      return res.status(201).json(user);

    } catch (error) {
      console.log(error)
      return res.status(500).json(errors.SOMETHING_WENT_WRONG);
    }
  }

  async logout(req, res) {
    const { sid } = req.cookies;

    const sessionRemoved = await redisClient.deleteSession(sid);
    if (!sessionRemoved) return res.status(500).json({ message: false});

    res.clearCookie("sid");

    return res.status(200).json({ message: true });
  }

  async getMe(req, res) {
    const { sid } = req.cookies;

    try {
      const session = await redisClient.getSession(sid);
  
      const user = await User.findOne({ _id: session.userId});

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(errors.SOMETHING_WENT_WRONG);
    }
  }

  async index(req, res) {
    const { id, ...params } = req.query;

    const whereObject = {};
    if (params.s) whereObject.push({ firstName: { $regex: params.s, $options: "i" } })
    let users;

    try {
      if (id) {
        users = await User.findOne({ _id: id});
        return res.status(200).json(users);
      }

      users = await User.find(whereObject);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    const { sid } = req.cookies;
    const { id } = req.params;

    console.log(id)

    try {
      const deleted = await User.deleteOne({ _id: id});
      if (!deleted.deletedCount) return res.status(500).json(errors.SOMETHING_WENT_WRONG)
      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(errors.SOMETHING_WENT_WRONG);
    }
  }
}

export default UserController;