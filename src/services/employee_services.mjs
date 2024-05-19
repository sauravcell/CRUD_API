import { responseHandler } from "../helpers/responseHandler.mjs"
import { EmployeeDB } from "../model/employeeDb.mjs";


export const fileUpload = async (req, res) => {
    responseHandler('successfully uploaded', false, null, 200, res);
}


//only accessible after login
export const userProfile = async (email, res) => {
    try {
        const user = await EmployeeDB.findOne({ email: email });
        responseHandler('success', false, user, 200, res);
    }
    catch (error) {
        console.error(error);
        responseHandler(error.message, false, null, 500, res);
    }

}
