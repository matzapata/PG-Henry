import * as express from "express";
import userRouter from "./users";
import tournamentRouter from "./tournaments";
import authRouter from "./auth";

const router: express.Router = express.Router();

router.use("/users", userRouter);

router.use("/auth", authRouter);

router.use("/tournaments", tournamentRouter);

export default router;
