import { Router } from "express";
import { ZipcodeSchema } from "../validation_schema/zipcode_schema.mjs";
import { getlocation } from "../controllers/zipcode_controller.mjs";
import { validateInputSchema } from "../helpers/input_validator.mjs";


const zipcode_route = Router();

zipcode_route.get(
    '/:pincode',
    ZipcodeSchema,
    validateInputSchema,
    getlocation
)

export default zipcode_route;
