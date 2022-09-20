require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "*" });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    httpServer.listen(PORT, () =>
      console.log(`Server working on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
