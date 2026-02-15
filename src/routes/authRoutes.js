import { Router } from "express";
import {
    register
} from "../controller/authController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validations/auth.schema.js";

const router = Router();

router.post('/register', validate(registerSchema), register);

export default router;