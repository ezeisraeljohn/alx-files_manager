import { getStatus, getStats } from "../controllers/AppController";
const { Router } = require("express");

const router = Router();

router.get("/status", getStatus);
router.get("/stats", getStats);

module.exports = router;
