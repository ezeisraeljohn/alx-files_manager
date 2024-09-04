import { getStatus, getStats } from "../controllers/AppController";
import { getConnect } from "../controllers/AuthController";
import { postNew } from "../controllers/UsersController";
import { getMe } from "../controllers/UsersController";
const { Router } = require("express");

const router = Router();

router.get("/status", getStatus);
router.get("/stats", getStats);
router.post("/users", postNew);
router.get("/connect", getConnect);
router.get("/users/me", getMe);

module.exports = router;
