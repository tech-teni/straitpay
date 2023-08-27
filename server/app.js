const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
// Use the cors middleware
app.use(cors());

const taskRoute = require("./route/task");
dotenv.config();
connect();

const PORT = process.env.PORT || 5000;

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
