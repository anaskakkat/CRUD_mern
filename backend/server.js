import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ConnectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
ConnectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.send("Server is  Ready.."));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
