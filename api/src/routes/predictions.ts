import prisma from "../db";
import * as express from "express";

const router: express.Router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body);

    const { user_id, tournament_id, data } = req.body.dataPost;
    const { scores_a, scores_b, match_id } = data;
    if (
      [user_id, tournament_id, scores_a, scores_b, match_id].includes(undefined)
    )
      return res.status(400).send("Missing required parameters.");
    const prediction = await prisma.predictions.create({
      data: {
        score_a: scores_a,
        score_b: scores_b,
        match_id,
        user_id,
        tournament_id,
      },
    });
    res.send({ msg: "Predicción EXITOSA", prediction: prediction });
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

export default router;
