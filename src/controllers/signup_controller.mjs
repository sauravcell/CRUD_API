import { signupPage, tryAddUser } from "../services/signup_services.mjs";

export const addUser = async(req, res) => {

    const reqBody = req.body;

    const userData = { 
        firstName : reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        phoneNumber: reqBody.phoneNumber,
        password: reqBody.password,
        conformPassword: reqBody.conformPassword,
        employeeType: reqBody.employeeType,
        houseName: reqBody.houseName,
        streetName: reqBody.streetName,
        cityName: reqBody.cityName,
        pinCode: reqBody.pinCode,
        state: reqBody.state,
        country: reqBody.country
    };

    tryAddUser(userData, res);
};

export const showSignupPage = async (req, res) => {
    signupPage(res);
}
