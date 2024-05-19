import { findLocation } from "../services/pincode_service.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs"

export const getlocation = (req, res) => {
    try {
        findLocation(req.params.pincode, res);
    } catch (err) {
        return responseHandler("Error encountered at Pincode route!!", true, '', 400, res);
    }
}
