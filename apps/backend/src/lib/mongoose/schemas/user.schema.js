import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  email: { type: String, unique: true },
  password: String,
  last_logged_in_at: Date,
}, 
{
  timestamps: true,
});

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  if (this.first_name || this.last_name) {
    this.full_name = `${this.first_name} ${this.last_name}`
  }
});

const User = mongoose.model("User", userSchema);

export default User;