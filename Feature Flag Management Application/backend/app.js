const express = require("express");
const cors = require("cors");
const featureFlags = require("./app/routes/featureFlags");
const changeFlag = require("./app/routes/changeFlag");
const featureFlag = require("./app/routes/featureFlag");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(featureFlags);
app.use(featureFlag);
app.use(changeFlag);

app.listen(3001);
