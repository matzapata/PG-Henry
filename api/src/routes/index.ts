import * as express from "express";
import userRouter from "./users";
import authRouter from "./auth";

const router: express.Router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
