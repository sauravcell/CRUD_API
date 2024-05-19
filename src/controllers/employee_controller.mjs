import { decPayload } from "../helpers/jwt_token.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs"
import { userProfile } from "../services/employee_services.mjs";


export const fileUpload = async (req, res) => {         //yt to cmplt
    responseHandler('successfully uploaded', false, null, 200, res);
}


//only accessible after login
export const dashboard = async (req, res) => {
    const data = decPayload(req.cookies.id);
    const user = data.payload.split(' ')[0]
    console.log({ 'user-email': user });
    userProfile(user, res);

}



export const logout = async (req, res) => {

    try {
        console.log(req.cookies.id)
        res.cookie('id', req.cookies.id, { maxAge: 0 });
        responseHandler('Logout successfull', false, null, 200, res);
    } 
    catch (error) {
        console.error(error);
        responseHandler(error.message,true,null,500,res);
    }

}

