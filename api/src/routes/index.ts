import * as express from "express";
import userRouter from "./users";
import tournamentRouter from "./tournaments";

const router: express.Router = express.Router();

router.use("/users", userRouter);

router.use("/tournaments", tournamentRouter);

export default router;
