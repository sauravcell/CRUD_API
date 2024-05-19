import { body } from "express-validator";

export const loginSchema = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty!")
    .isEmail()
    .withMessage("Provide a valid email address!"),
  body('password')
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!")
];
