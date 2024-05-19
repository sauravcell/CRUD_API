import express from "express";
import { loginUser } from "../controllers/login_controller.mjs";
import { loginSchema } from "../validation_schema/login_schema.mjs";
import { validateInputSchema } from "../helpers/input_validator.mjs";

const router = express.Router();

router.post(
    "/",
    loginSchema,
    validateInputSchema,
    loginUser
);

export default router;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized - Invalid credentials
 * 
 * 
 */


