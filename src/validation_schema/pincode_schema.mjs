import { param } from "express-validator";

const ZipcodeRegex = /^[1-9][0-9]{6}$/;

export const ZipcodeSchema = [
    param('pincode')
        .notEmpty()
        .withMessage("Zipcode is required!")
        .isLength({ min: 6, max: 6 })
        .withMessage("Zipcode length should be min and max is 6")
        .isNumeric()
        .withMessage("Zipcode can not be string. Please provide a proper Zipcode!")
]
