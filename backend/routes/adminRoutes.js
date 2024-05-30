import express from "express";
const adminRouter = express.Router();
import {
  adminLogin,
  adminLogout,
  deleteUser,
  loadUser,
  profileUpdate,
  userData,
} from "../controllers/adminController.js";
adminRouter.post("/adminLogin", adminLogin);
adminRouter.post("/adminLogout", adminLogout);
adminRouter.get("/loadUsers", loadUser);
adminRouter.delete("/deleteUser/:id", deleteUser);
adminRouter.get("/userData/:id", userData);
adminRouter.put("/profileUpdate", profileUpdate);

export default adminRouter;
