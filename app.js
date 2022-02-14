require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3005;

//API security
app.use(helmet());

//hanlde CORS error
app.use(cors());

//MongoDB connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

if (process.env.MODE_ENV !== "production") {
  const monDB = mongoose.connection;
  monDB.on("open", () => {
    console.log("MongoDB is connected");
  });

  monDB.on("error", (error) => {
    console.log(error);
  });
}

//Logger
app.use(morgan("tiny"));

// set body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load routers
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");

//use Router
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

app.use((req, res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

//error handler
const handleError = require("./src/utils/errorHandler");

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
