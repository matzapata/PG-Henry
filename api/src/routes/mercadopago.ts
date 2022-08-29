import * as express from "express";
import axios from "axios";

const router: express.Router = express.Router();

async function PaymentService(tournamentid: string, userid: string) {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    items: [
      {
        title: "Unirse a un torneo",
        description: "Con esta compra eres capaz de unirte a un torneo",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "category123",
        quantity: 1,
        unit_price: 200,
      },
    ],
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: `${process.env.CLIENT_URL}`,
    },
    auto_return: "approved",
    metadata: {
      tournament_id: tournamentid,
      user_id: userid,
    },
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return payment;
}

router.get("/payment", async function (req, res: any, next) {
  try {
    const { tournamentid, userid } = req.query;
    const response = await PaymentService(tournamentid as any, userid as any);
    res.send(response.data.init_point);
  } catch (error) {
    res.send(error);
  }
});

export default router;
