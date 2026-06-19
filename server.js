require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const rateLimit =
require("express-rate-limit");

const mongoSanitize =
require("mongo-sanitize");

const xssClean =
require("xss-clean");

const authRoutes =
require("./routes/authRoutes");

const errorHandler =
require("./middleware/errorMiddleware");

const app = express();


// Security Headers
app.use(helmet());

// Prevent XSS
app.use(xssClean());

// JSON Parser
app.use(express.json());

// CORS
app.use(cors());

// Rate Limiter
const limiter =
rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);


// NoSQL Injection Protection
app.use((req, res, next) => {

    req.body =
    mongoSanitize(req.body);

    req.query =
    mongoSanitize(req.query);

    next();
});


// MongoDB
mongoose.connect(
process.env.MONGO_URI
)
.then(() =>
console.log("MongoDB Connected")
);

app.get("/", (req, res) => {
    res.send(
        "Secure Validation API Running"
    );
});

app.use("/api/auth",
authRoutes);

app.use(errorHandler);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
    `Server running on ${PORT}`
    );
});
