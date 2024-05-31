import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

// ---user login------------------------------------------------------------------------------------------------------------------

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && !user.isAdmin && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email,image:user.image });
  } else {
    res.status(401);
    throw new Error("invalid user data");
  }
});

//register new  user---------------------------------------------------------------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  // console.log("body::", req.body);
  const { name, email, password, image } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.error("user already exists");
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
    image,
  });
  // console.log('user:',user);
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//logout---------------------------------------------------------------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.json({ message: "cookie cleared" });
});

//get user profile---------------------------------------------------------------------------------------------------------------------

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200);
  res.json(user);
});

//update user profile---------------------------------------------------------------------------------------------------------------------

const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const user = await User.findById(req.body.userInfo._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
};
