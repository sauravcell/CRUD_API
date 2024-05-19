import { SignupInterns } from "../model/signup.mjs";
import { SentOTP } from "../model/sent_otp_schema.mjs";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { responseHandler } from "../helpers/responseHandler.mjs";
import { transporter } from "../helpers/mail_transpoter.mjs";
import { signPayload, verifyToken, decPayload } from "../helpers/jwt_token.mjs";
// import nodemailer from "nodemailer";


// route for generating OTP
export const sendOTP = async(email, res) => {

    try {

        let existingUser = await SignupInterns.findOne({ email });

        if (!existingUser){
            return responseHandler('The email provided does not exist!!', true, '', 200, res)
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const timestamp = Math.floor(new Date().getTime() / 60000);
        const token = signPayload( existingUser.email, 600);   // token should be valid for 600 seconds (10 min)

        const messageString = "Your recovery OTP : " + otp + "\n\nReset token : " + token;

        const info = await transporter.sendMail({
            from: process.env.Email,
            to: email,
            subject: "Password reset token",
            text: messageString,
        });

        const otpRequest = new SentOTP({
            email,
            otp: otp,
            otpAccessed: false,
            timestamp,
            retries: 3
        });

        await otpRequest.save();

        console.log("Otp generated : ", otp);
        return responseHandler('The OTP has been send to your email!!', false, '', 200, res)

    } catch (err) {

        if (err.code === 11000) {
            return responseHandler('OTP already generated for the email!!', true, '', 200, res)
        } else {
            console.log("Error at sendOTP call =>  ", err);
            return responseHandler(err, true, '', 200, res)
        }
    }
}


// route for password reset using OTP
export const recover = async (token, otp, password, res) => {

    console.log()

    try {

        console.log();

        console.log("Verytoken : ", verifyToken(token));
        if (!verifyToken(token)) {
            return responseHandler('The token is not a valid token OR it has been expired!!', true, '', 200, res);
        }

        let payload = decPayload(token);

        let resetAccount = await SentOTP.findOne({ email:payload.payload });

        if (!resetAccount) {
            return responseHandler('No password reset request found for this email!!', true, '', 200, res);
        }

        const currentTimestamp = Math.floor(new Date().getTime() / 60000);    // unix epoch in milisseconds
        if (currentTimestamp - resetAccount.timestamp > 10){
            return responseHandler('OTP is expired!!', true, '', 200, res);
        }

        if ( resetAccount.retries === 0 ) {
            return responseHandler('All the retires has been made!!', true, '', 200, res);
        }

        if (resetAccount.otpAccessed == true) {
            return responseHandler('OTP has been accessed by the email!!', true, '', 200, res)
        }

        if ( otp != resetAccount.otp ){

            console.log("Retries left : ", resetAccount.retries);
            resetAccount.retries = resetAccount.retries - 1;
            await resetAccount.save();

            return responseHandler(`Wrong OTP!! Retries left : ${resetAccount.retries} times`, true, '', 200, res);

        } else {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            let account = await SignupInterns.findOne({ email:resetAccount.email });
            account.password = hashedPassword;
            await account.save();

            resetAccount.otpAccessed = true;
            await resetAccount.save();

            return responseHandler("Password Updated Successfully!!", false, '', 200, res);
        }

    } catch (err) {
        console.log("Error encountered => ", err);
        return responseHandler("Encountered error!", true, '', 200, res);
    }
}
