import * as express from "express";
import db from "../db";
import "dotenv/config";
import sendEmail from "../utils/sendEmail";

const router: express.Router = express.Router();

router.post(
  "/:id/comments",
  async (req: express.Request, res: express.Response) => {
    try {
      const { stars, comentaries, titulo } = req.body;
      const { id } = req.params;
      if (!comentaries)
        return res.status(400).send("Missing required parameters.");

      const comments = await db.comments.create({
        data: {
          stars,
          comentaries,
          titulo,
          user_id: id,
        },
      });
      res.status(200).send({ message: "Comment created successfully" });
    } catch (error: any) {
      return res.status(404).json({ status: "failed", msg: error.message });
    }
  }
);

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { type } = req.query;
    let comments = [];

    if (type && type === "good") {
      comments = await db.comments.findMany({
        where: { stars: { gt: 3 } },
      });
    } else if (type && type === "bad") {
      comments = await db.comments.findMany({
        where: { stars: { lte: 3 } },
      });
    } else {
      comments = await db.comments.findMany();
    }
    if (comments.length === 0)
      return res.status(400).send("There are no comments.");
    const resultado: any = [];

    for (let i = 0; i < comments.length; i++) {
      const user = await db.user.findUnique({
        where: { id: comments[i].user_id },
      });
      const rev: any = {
        username: user?.username,
        avatar: user?.url_avatar,
        id: user?.id,
        comentario: comments[i].comentaries,
        stars: comments[i].stars,
        titulo: comments[i].titulo,
        email: user?.email,
      };
      resultado.push(rev);
    }

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(404).json({ status: "failed", msg: error.message });
  }
});

router.post(
  "/denunciar",
  async (req: express.Request, res: express.Response) => {
    const { email, comentario } = req.body;
    try {
      if (!email) return res.send("No hay ningun feedback con ese correo...");

      sendEmail(
        process.env.EMAIL_USER as string,
        "Alguien ha denunciado un feedback",
        `Alguien ha encontrado que el comentario: "${comentario}" del usuario: ${email} no corresponde. \n
        Por favor revisar y corregir lo antes posible.`
      );
      return res.send("Comentario denunciado correctamente !");
    } catch (err: any) {
      return res.status(400).send({ message: err });
    }
  }
);

router.delete(
  "/deletereview",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.body;
    try {
      const comment = await db.comments.delete({ where: { user_id: id } });
      return res.send("Comentario eliminado correctamente!");
    } catch (err: any) {
      return res.status(400).send({ message: err });
    }
  }
);

export default router;
