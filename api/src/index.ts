import app from "./app";
import "dotenv/config";
import routes from "./routes";
import * as express from "express";

app.use("/api", routes);
app.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Bad request");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
