import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: {
    type: String,
    default: function () {
      const email = this.email.trim().toLowerCase();

      const hash = crypto.createHash("md5").update(email).digest("hex");

      return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
    },
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
