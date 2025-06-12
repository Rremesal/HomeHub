import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  last_login_at: Date
},
{
  timestamps: true
});

userSchema.pre("save", async function(next) {
  try {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }

    if (this.firstName || this.lastName) {
      console.log(this.firstName);
      this.fullName = `${this.firstName} ${this.lastName}`;
      console.log(this.fullName);
    }
  } catch (e) {
    next(e);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;