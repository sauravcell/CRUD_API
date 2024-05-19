import { sendOTP,recover } from "../services/account_services.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs"


export const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
        sendOTP(email, res);

    } catch (err) {
        console.log("Error at forgotPassword\n Error => ", err);
        console.log()
        return responseHandler("Error encountered at forgotPassword!!", true, '', 400, res);
    }
}

export const recoverPassword = async (req, res) => {

    try {
        const { otp, token, newPassword, conformPassword } = req.body;

        if ( newPassword === conformPassword ){
            recover(token, otp, newPassword, res);
        } else {
            return responseHandler("Password and conform password did not match!!", true, '', 400, res);
        }

    } catch (err){
        console.log("Error at recoverPassword\n Error => ", err);
        console.log()
        return responseHandler("Error encountered at recoverPassword!!", true, '', 400, res);
    }
}
