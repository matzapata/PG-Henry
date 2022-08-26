/* eslint-disable @typescript-eslint/no-var-requires */
const serverless = require("serverless-http");
const router = require("../build/routes/index").default;
const app = require("../build/app").default;

app.use("/.netlify/functions/api", router); // path must route to lambda
app.use("*", (req, res) => {
  res.status(404).send("Bad request");
});

module.exports = app;
module.exports.handler = serverless(app);
