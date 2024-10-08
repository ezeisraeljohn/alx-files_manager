const express = require("express");
const statusStatsRouter = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", statusStatsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
