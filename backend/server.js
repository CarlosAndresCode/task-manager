require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");


const authRouter = require("./router/authRoutes");
const userRoutes = require("./router/userRoutes");
const { log } = require("console");

const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Router
app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/reports', reportRoutes);

//Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});