import axios from "axios";

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      items: [
        {
          title: "Comprar torneo",
          description: "Con esta compra seras capaz de crear tu propio torneo",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 1,
        },
      ],
      back_urls: {
        failure: "/feedback",
        pending: "/feedback",
        success: "/feedback",
      },
      auto_return: "approved",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }
}

export default PaymentService;
