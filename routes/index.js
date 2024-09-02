import { status, stats } from "../controllers/AppControllers";
const { Router } = require("express");

const router = Router();

router.get("/status", status);
router.get("/stats", stats);
