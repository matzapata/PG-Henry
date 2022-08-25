import * as express from "express";
import axios from "axios";

const router: express.Router = express.Router();

async function PaymentService() {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    items: [
      {
        title: "Unirse a un torneo",
        description: "Con esta compra eres capaz de unirte a un torneo",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "category123",
        quantity: 1,
        unit_price: 1,
      },
    ],
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
    },
    auto_return: "approved",
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
  const lel = await PaymentService();
  res.send(lel.data.init_point);
});

export default router;
