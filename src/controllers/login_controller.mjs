import { responseHandler } from "../helpers/responseHandler.mjs";
import { userLogin } from "../services/login_services.mjs"
import { decPayload } from "../helpers/jwt_token.mjs";

export const loginUser = async (req, res) => {
    console.log(`Login Input: ${req.body.email} :: ${req.body.password}`)

    console.log({'Incoming cookies: ':req.cookies});

    if(req.cookies.id != undefined){
        const user = decPayload(req.cookies.id);
        console.log({'cookie-data: ': user});
    }
    userLogin(req,res);

};


