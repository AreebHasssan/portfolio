const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const auth = require("./views/admin/admin");
const projectRoutes = require("./views/admin/projectRoutes");
const testimonialRoutes = require("./views/admin/testimonialRoutes");
const skillRoutes = require("./views/admin/skillRoutes");
const messageRoutes = require("./views/admin/messageRoutes");

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://portfolio-lilac-two-90.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS origin denied: ${origin}`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Correct
app.use("/api/auth", auth);

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});
