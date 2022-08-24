import axios from "axios";

class PaymentService {
  async createPayment() {
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
    console.log(payment.data);

    return payment.data;
  }
}

export default PaymentService;
