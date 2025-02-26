const express = require("express");
const { connectDB } = require("./config");

const app = express();

// app.use(cors())
app.use(express.json());

connectDB();

app.use("/api/user", require("./routes/user"));

app.listen(5000, () => {
  console.log(`server is running on port ${5000}`);
});
