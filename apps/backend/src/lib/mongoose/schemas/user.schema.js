import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  email: { type: String, unique: true },
  password: String,
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password)
});

const User = mongoose.model("User", userSchema);

export default User;