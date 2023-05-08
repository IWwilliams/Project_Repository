const express = require("express");
const cors = require("cors");
const app = express();
const getAllLineItems = require("./routes/getAllLineItems");
const getPostalLineItems = require("./routes/getPostalLineItems");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(getAllLineItems);
app.use(getPostalLineItems);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
