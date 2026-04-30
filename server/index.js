import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import PdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credit.controller.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(express.json());
app.use(cookieParser()); // To Store token in cookie
app.use(
  cors({
    origin: "http://localhost:5173", // Only to be accessed by the client(frontend)
    credentials: true, // To access cookies and headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "ExamNotesAI Backend is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", PdfRouter);
app.use("/api/credit", creditRouter);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  connectDB();
});
