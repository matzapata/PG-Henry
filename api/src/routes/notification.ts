import axios from "axios";
import * as express from "express";
import db from "../db";
import sendEmail from "../utils/sendEmail";

const router: express.Router = express.Router();

async function PaymentCheck(id: string) {
  const url = `https://api.mercadopago.com/v1/payments/${id}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return result;
}

router.post("/", async (req, res) => {
  try {
    if (req.body.action === "payment.updated") {
      const response = await PaymentCheck(req.body.data.id);
      if (response.data.status === "approved") {
        await db.userTournament.create({
          data: {
            user_id: response.data.metadata.user_id,
            tournament_id: response.data.metadata.tournament_id,
          },
        });
        await db.tournament.update({
          where: {
            id: response.data.metadata.tournament_id,
          },
          data: {
            pool: { increment: 160 },
          },
        });
        await sendEmail(
          response.data.metadata.user_email,
          "PRODEMASTER",
          `Te has unido correctamente al torneo. Click aquí para ir: ${process.env.CLIENT_URL}/torneos/${response.data.metadata.tournament_id}`
        );
      }
    }
    res.status(200).send("OK");
  } catch (error) {
    res.send(error);
  }
});

export default router;
