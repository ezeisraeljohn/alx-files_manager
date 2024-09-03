import { getStatus, getStats } from "../controllers/AppController";
import { postNew } from "../controllers/UsersController";
const { Router } = require("express");

const router = Router();

router.get("/status", getStatus);
router.get("/stats", getStats);
router.post("/users", postNew);

module.exports = router;
