import * as express from "express";
import { isAdmin, protectedRoute } from "../middleware/auth";
import * as auth from "../utils/auth";

const router: express.Router = express.Router();

router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
    const { username, fullName, email, password } = req.body;
    await auth.register(email, password, username, fullName);
    res.status(200).send("User created successfully");
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.post("/signin", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const data = await auth.login(email, password);
    res.status(200).json({
      message: "Account login successful",
      data,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/protected", protectedRoute, function (req, res) {
  console.log(req.user);
  res.send("Authorized");
});

router.get(
  "/admin",
  [protectedRoute, isAdmin],
  function (req: express.Request, res: express.Response) {
    console.log(req.user);
    res.send("Authorized");
  }
);

export default router;
