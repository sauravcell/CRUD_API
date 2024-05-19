import dotenv from "dotenv";
import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

/*
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.Email,
        pass: process.env.Password,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
});
*/

export const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
});
