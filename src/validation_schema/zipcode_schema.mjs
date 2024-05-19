// const { query, validationResult } = require('express-validator');
// import { response } from "express";
// import { Address } from '../model/address.mjs';
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
    // .matches(ZipcodeRegex)
    // .withMessage("Zipcode is not valid in india. Please provide a proper Zipcode!"),

]


// const ZipcodeRegex = /^[1-9][0-9]{6}$/;
// export const ZipcodeSchema = [
//     param("pincode")
//         .notEmpty()
//         .withMessage("Zipcode is required!")
//         .isLength({ min: 6, max: 6 })
//         .withMessage("Zipcode length should be min and max is 6")
//         .isNumeric()
//         .withMessage("Zipcode can not be string. Please provide a proper Zipcode!")
//         .matches(ZipcodeRegex)
//         .withMessage("Zipcode is not valid in india. Please provide a proper Zipcode!"),
// ];

// const check_zipcode = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const zipcode = req.params.pincode;
//     const exist_zipcode = await Address.findOne({ pincode: zipcode });
//     if (!exist_zipcode) {
//         return res.status(400).json({ errors: [{ msg: "Zipcode not found in the database , Please provide a proper Zipcode!" }] });
//     }

//     req.zipcode = exist_zipcode;
//     next();
// };
