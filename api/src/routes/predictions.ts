import prisma from "../db";
import * as express from "express";
import db from "../db";
import { protectedRoute } from "../middleware/auth";

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    res.send("predictions");
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

export default router;
