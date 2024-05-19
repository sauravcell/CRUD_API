import express from "express";
import { addUser, showSignupPage } from "../controllers/signup_controller.mjs"
import { validateInputSchema  } from "../helpers/input_validator.mjs";
import { signupSchema } from "../validation_schema/signup_schema.mjs";

const router = express.Router();


router.get("/", showSignupPage);

router.post("/",
  signupSchema,
  validateInputSchema,
  addUser
);

export default router;


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               conformPassword:
 *                  type: string
 *               employeeType:
 *                 type: string
 *               houseName:
 *                 type: string
 *               streetName:
 *                 type: string
 *               cityName:
 *                 type: string
 *               pinCode:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               phoneNumber:
 *                  type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, missing required parameters
 *       409:
 *         description: Conflict, user with provided email already exists
 */

console.log("testing.............");
