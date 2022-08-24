import prisma from "../db";
import * as express from "express";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("User index");
});

router.put(
  "/:id/status",
  async (req: express.Request, res: express.Response) => {
    try {
      const { is_active } = req.body;
      const { id } = req.params;
      if (is_active) {
        let status = await prisma.user.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
        status.is_active = false;
        await prisma.user.update({
          where: {
            id: id,
          },
          data: status,
        });
        res.send(status);
      } else {
        throw new Error("is_active is not true");
      }
    } catch (error: any) {
      res.status(404).json({ status: "failed", msg: error.message });
    }
  }
);

export default router;
