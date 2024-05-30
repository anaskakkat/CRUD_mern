// backend/controllers/adminController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
// login admin
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);
  const admin = await User.findOne({ email });
  //   console.log("admin:", admin);
  if (admin && admin.isAdmin && (await admin.matchPasswords(password))) {
    console.log("admin loged");
    generateToken(res, admin._id),
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
//logout---------------------------------------------------------------------------------------------------------------------
const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "logout  finished" });
});
// get users ---------------------------------------------------------------------------------------------------------------------
const loadUser = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: { $ne: true } });

  res.json(users);
});

// delete users ---------------------------------------------------------------------------------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
//  users  data---------------------------------------------------------------------------------------------------------------------
const userData = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const users = await User.findOne({ _id: userId });
  // console.log(users);
  res.json(users);
});
//update user profile---------------------------------------------------------------------------------------------------------------------

const profileUpdate = asyncHandler(async (req, res) => {
  // const userid=req.params.id
  // console.log("body::", req.body);

  const user = await User.findById(req.body.userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error(" user not found");
  }
});
export {
  adminLogin,
  adminLogout,
  loadUser,
  deleteUser,
  userData,
  profileUpdate,
};
