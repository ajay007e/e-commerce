require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const createError = require("http-errors");

const db = require("./config/connection");

const v1Router = require("./api/routes/v1/v1.routes");

const app = express();

/* ---------------------------------------------
   CORS
--------------------------------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());

/* ---------------------------------------------
   Logger
--------------------------------------------- */
app.use(logger("dev"));

/* ---------------------------------------------
   Static Files (Uploads, Public Assets)
--------------------------------------------- */
app.use(express.static(path.join(__dirname, "public")));

/* ---------------------------------------------
   Body Parsers (JSON + Form)
--------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---------------------------------------------
   Cookies
--------------------------------------------- */
app.use(cookieParser());

/* ---------------------------------------------
   Session (Optional — keep if using login sessions)
--------------------------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my_super_secret_key",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

/* ---------------------------------------------
   API Routes
--------------------------------------------- */
app.use("/api/v1", v1Router);

/* ---------------------------------------------
   Database
--------------------------------------------- */
db.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err);
  } else {
    console.log("Connected to database");
  }
});

/* ---------------------------------------------
   404 Handler
--------------------------------------------- */
app.use((req, res, next) => {
  next(createError(404));
});

/* ---------------------------------------------
   Error Handler
--------------------------------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  return res.status(err.status || 500).json({
    status: false,
    message: err.message || "Server Error",
  });
});

module.exports = app;
