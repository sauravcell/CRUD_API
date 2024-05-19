//Defining global middleware function to show the requested api endpoint in console.
import { date_time } from "./getDate.mjs";
export const pathmiddleWare = (req, res, next) => {
    console.log(`REQUESTING=> ${req.method} :${req.url}`);
    date_time();
    next();
};
