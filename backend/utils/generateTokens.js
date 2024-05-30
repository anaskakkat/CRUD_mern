import jwt from "jsonwebtoken";

const genetrateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // console.log('create token',token);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    samSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default genetrateToken;
