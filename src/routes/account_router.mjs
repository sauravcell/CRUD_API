import { Router } from "express";
import { body,query } from "express-validator";
import { validateInputSchema } from "../helpers/input_validator.mjs";
import { forgotPassword,recoverPassword } from "../controllers/account_recover_controller.mjs";


const account_recover_router = Router();


const alphaNumericRegex = /^[a-zA-Z0-9]*$/;

account_recover_router.post("/",
    [
        body('email')
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Provide a valid email address!!")
    ],
    validateInputSchema,
    forgotPassword
);

account_recover_router.post("/recover",
    [
        body('token')
            .trim()
            .notEmpty()
            .withMessage("Invalid password recovery URL!!")
            //.matches(alphaNumericRegex)
            //.withMessage("Invalid token for password recovery!!")
    ],
    validateInputSchema,
    recoverPassword
);

export default account_recover_router;
