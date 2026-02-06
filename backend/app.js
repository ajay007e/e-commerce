require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var hbs = require("express-handlebars");
var fileUpload = require("express-fileupload");
var session = require("express-session");

var db = require("./config/connection");

var adminRouter = require("./routes/admin");
var usersRouter = require("./routes/users");

const apiAdminRouter = require("./api/routes/admin.routes");
const apiUserRouter = require("./api/routes/user.routes");
const adminConfigRouter = require("./api/routes/config.routes");

const v1Router = require("./api/routes/v1/v1.routes");

var app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Allow preflight requests
app.options("*", cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/",
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());
db.connect((err) => {
  if (err) console.error("Error connecting to database", err);
  else console.log("Connected to database at port 27017");
});

app.use(
  session({
    // name: "sid",
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

app.use("/", usersRouter);
app.use("/admin", adminRouter);
app.use("/api/users", apiUserRouter);
app.use("/api/admin", apiAdminRouter);
app.use("/api/config", adminConfigRouter);

app.use("/api/v1", v1Router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
