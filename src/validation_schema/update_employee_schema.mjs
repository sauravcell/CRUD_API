import { body,param } from "express-validator";

const phoneNoRegex = /^\d{10}$/;

export const inputSchema = [
    param("empId")
        .trim()
        .notEmpty()
        .withMessage("Employee ID can't be empty!!")
        .isLength({ min:24, max:24 })
        .withMessage("Provide a valid Employee ID!!")
        .isHexadecimal()
        .withMessage("Provide a valid Employee ID!!"),
    body('firstName')
        .optional()
        .exists()
        .trim()
        .isAlpha()
        .withMessage("Name should only contain alphabetic charracters!!")
        .isLength({ min: 3, max: 20 })
        .withMessage("First name is less than 3 charachers. Please provide a proper name!"),
    body('lastName')
        .optional()
        .exists()
        .trim()
        .withMessage("Name should only contain alphabetic charracters!!")
        .isLength({ min:3, max: 20 })
        .withMessage("Last name is less than 3 charachers. Please provide a proper name!"),
    body('email')
        .optional()
        .exists()
        .trim()
        .isEmail()
        .withMessage("Provide a valid email address!"),
    body('phoneNumber')
        .optional()
        .exists()
        .trim()
        .withMessage("Phone number is required!")
        .matches(phoneNoRegex)
        .withMessage("Enter valid 10 digit number!"),
];
