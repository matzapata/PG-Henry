import * as express from "express";
import userRouter from "./users";
import tournamentRouter from "./tournaments";
import authRouter from "./auth";
import mercadopagoRouter from "./mercadopago";
import notificationRouter from "./notification";

const router: express.Router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/tournaments", tournamentRouter);
router.use("/mercadopago", mercadopagoRouter);
router.use("/notification", notificationRouter);

export default router;
