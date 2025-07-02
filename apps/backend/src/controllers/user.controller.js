
import { addMinutes } from "date-fns";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Core
import { loginValidation } from "../_validations.js";
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

      if (!isPasswordValid) return res.status(500).json(errors.SOMETHING_WENT_WRONG);

      const sessionToken = crypto.randomBytes(16).toString("hex");

      redisClient.createSession(sessionToken, user.id, req.ip);

      res.cookie("sid", sessionToken, { maxAge: 30 * 60 * 1000 });

      return res.status(200).json(true);

    } catch (error) {
      console.log(error);
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
}

export default UserController;