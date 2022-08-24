class PaymentController {
  subscriptionService: any;
  constructor(subscriptionService: any) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(
    req: any,
    res: {
      json: (arg0: any) => any;
      status: (
        arg0: number
      ) => {
        (): any;
        new (): any;
        json: { (arg0: { error: boolean; msg: string }): any; new (): any };
      };
    }
  ) {
    try {
      const payment = await this.subscriptionService.createPayment();
      console.log(payment);
      return res.json(payment);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }
}

export default PaymentController;
