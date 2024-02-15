import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    // role: {
    //   type: String,
    //   required: true,
    // }
    role: {
        type: String,
        required: true,
        enum: ['normal', 'registered', 'admin'] // Enum with allowed values
      },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("UserSchema", userModelSchema);

export default UserSchema;
