
import { Address } from "../model/address.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs"

export const findLocation = async (pincode, res) => {

    try {
        const address = await Address.findOne({ pinCode: pinCode });
        console.log(address)

        if (!address) {
            return responseHandler("Zipcode not found in the database hence not valid in india, Please provide a proper Zipcode!", false, '', 200, res);
        }

        else {
            console.log("address", address)
            return responseHandler({address}, false, '', 200, res);
        }
    }
    catch (error) {
        return responseHandler(error.message, true, '', 400, res);
    }
}
