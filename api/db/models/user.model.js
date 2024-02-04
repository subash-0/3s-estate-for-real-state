import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default:'https://p7.hiclipart.com/preview/282/256/961/user-profile-avatar-computer-icons-google-account.jpg',
    },
  },{timestamps:true});
  userSchema.index({ username: 1 }, { unique: true });
  userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User",userSchema);

export default User;
