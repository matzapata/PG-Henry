import axios from "axios";
import * as express from "express";
import db from "../db";

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
      }
    }
    res.status(200).send("OK");
  } catch (e) {
    res.send(e);
  }
});

export default router;
