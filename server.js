const express = require("express");
const statusStatsRouter = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/", statusStatsRouter);
