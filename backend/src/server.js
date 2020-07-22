const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DB_ACCESS_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("[DATABASE] -> Connection OK");
  })
  .catch((err) => console.error("[DATABASE] -> Connection failed."));

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`[SERVER] -> OK: Listening on PORT ${PORT}`);
});
