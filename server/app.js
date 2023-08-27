const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db");
const taskRoute = require("./route/task");
dotenv.config();
connect();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {});
app.use("/", taskRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
