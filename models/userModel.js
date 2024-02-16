import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    // role: {
    //   type: String,
    //   required: true,
    // }
    role: {
        type: String,
        required: false,
        enum: ['normal', 'registered', 'admin'] // Enum with allowed values
      },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("UserSchema", userModelSchema);

export default UserSchema;
