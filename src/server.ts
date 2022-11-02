import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import { initRoutes } from './routes';

const app = express();

// Connect to MongoDB
connectDB();
initRoutes(app);


// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});



const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
