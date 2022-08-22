import * as express from "express";
import db from "../db";
import * as bcrypt from "bcryptjs";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("User index");
});

router.put(
  "/changepsw",
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Faltan parametros requeridos!");
    try {
      const user = await db.user.update({
        where: {
          email: email,
        },
        data: {
          password: bcrypt.hashSync(password, 8),
        },
      });
      res.status(200).json({ msg: "Contraseña cambiada exitosamente." });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "No se ha podido cambiar la contraseña." });
    }
  }
);

export default router;
