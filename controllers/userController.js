import UserSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";

// Sign up function
export const signup = async (req, res) => {
  let { name, email, role, phone } = req.body;
  if(!password){
    return res.status(400).json({message:"password is required"});
  }
  // const generatedPassword = "random";
  const password = req.body.password || generatedPassword;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const newUser = new UserSchema({
      name,
      email,
      phone,
      role,
      password: hash,
    });
    await newUser.save();
    const token = createToken(newUser);
    const decoded = verifyToken(token);
    res
      .status(200)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "user created successfully", token: decoded });
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong !");
  }
};

// Google Auth
export const gsignup = async (req, res) => {
  const { name, email, role, phone } = req.body;
  const generatedPassword = "random";
  const password = req.body.password || generatedPassword;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    // Check if the user already exists
    let user = await UserSchema.findOne({ email: email });

    if (user) {
      // If user already exists, return token
      const token = createToken(user);
      const decoded = verifyToken(token);
      return res
        .cookie("userToken", token, {
          secure: true,
          httpOnly: true,
          sameSite: "None",
        })
        .status(200)
        .json({ message: "user logged in successfully", token: decoded });
    }

    // If user does not exist, create a new user
    const newUser = new UserSchema({
      name,
      email,
      password: hash,
      role,
      phone,
    });
    await newUser.save();
    const token = createToken(newUser);
    const decoded = verifyToken(token);
    return res
      .status(200)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "user created successfully", token: decoded });
  } catch (err) {
    console.log(err);
    return res.status(401).send("Something went wrong !");
  }
};

// Log in function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email: email });

    if (!user) {
      return res.status(401).send("User not found !");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect password !");
    }

    const token = createToken(user);
    const decoded = verifyToken(token);
    return res
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "User logged in successfully", token: decoded });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Error logging in" });
  }
};

//logout fct

export const logout = (req, res) => {
  console.log("cookie cleared");
  return res
    .clearCookie("userToken")
    .status(200)
    .send("successfully logged out");
};

// Controller for creating a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller for getting all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single user by ID
export const getUserById = async (req, res) => {
  const token = req.cookies.userToken;
  const decoded = verifyToken(token);
  const id = decoded.data ? decoded.data.id : undefined;
  try {
    if (!id) {
      return res.status(400).json({ error: "NO Token!!!!!!!" });
    }
    const user = await UserSchema.findById(id);
    console.log("getOne user", user);
    if (user) {
      return res.status(200).json({
        Picture: user.picture,
        Role: user.role,
        id: user._id,
        name: user.name,
        photourl: user.photourl,
        phone: user.phone,
      });
    } else {
      return res.status(404).json({ error: "User Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't find user" });
  }
};


// Controller for updating a user by ID
export const updateUserById = async (req, res) => {
//   try {
//     const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedUser) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const id = req.params.id;
  console.log("Updating user with ID:", id);

  try {
    const { name, email, role } = req.body;

    await UserSchema.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        // phone: phone,
        role: role,
      }
    );

    console.log("User updated successfully");

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Trouble updating user info" });
  }
};


// Controller for deleting a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
