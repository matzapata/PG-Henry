import * as express from "express";
import PaymentController from "../Controllers/PaymentsController";
import PaymentService from "../Services/PaymentsService";

const router: express.Router = express.Router();
const PaymentInstance = new PaymentController(new PaymentService());

router.get("/payment", function (req, res: any, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/feedback", function (req, res) {
  express.response.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

export default router;
