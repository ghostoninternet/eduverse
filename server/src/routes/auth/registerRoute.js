import express from "express";
import { Register } from "../../controllers/auth/registerController.js";
const router = express.Router();

router.post("/signup", Register);

export default router;
