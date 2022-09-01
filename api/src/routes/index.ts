import * as express from "express";
import userRouter from "./users";
import tournamentRouter from "./tournaments";
import authRouter from "./auth";
import mercadopagoRouter from "./mercadopago";
import notificationRouter from "./notification";
import commentsRouter from "./feedback";
import predictionRouter from "./predictions";
import statsRouter from "./stats";

const router: express.Router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/tournaments", tournamentRouter);
router.use("/mercadopago", mercadopagoRouter);
router.use("/notification", notificationRouter);
router.use("/feedback", commentsRouter);
router.use("/predictions", predictionRouter);
router.use("/stats", statsRouter);

export default router;
