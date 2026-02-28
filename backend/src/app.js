import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
})

export default app;