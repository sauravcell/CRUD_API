import bcrypt from "bcrypt";
import { SignupInterns } from "../model/signup.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs";


export const signupPage = (res) => {
    return responseHandler("<h2>This is the signup page.</h2> <p>These are the required keys : </p> <ol> <li>firstname : First name</li> <li>lastname : Last name</li> <li>email : Valid email</li> <li>password : Min 8 char password</li> </ol>", false, '', 200, res);
}


export const tryAddUser = async (userData, res) => {

    const saltRounds = 10;

    console.log(userData);

    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            conformPassword,
            employeeType,
            houseName,
            streetName,
            cityName,
            pinCode,
            state,
            country
        } = userData;


        if (!firstName || !lastName || !email || !phoneNumber || !password || !employeeType || !houseName || !streetName || !cityName || !pinCode || !state || !country) {
            return responseHandler("Necessary data not provided, cannot sign you up!!", true, '', 200, res);
        }

        if (password != conformPassword) {
            return responseHandler("Password and conform password does not match!!", true, '', 200, res);
        }

        let addressLine1 = houseName + ',' + streetName;
        let addressLine2 = cityName + ',' + pinCode + ',' + state + ',' + country;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new SignupInterns({
            firstName,
            lastName,
            email,
            phoneNumber,
            password:hashedPassword,
            employeeType,
            addressLine1,
            addressLine2,
        });

        await user.save();

        return responseHandler("Data saved successfully!!", false, '', 200, res);

    } catch (err) {

        if (err.code === 11000){
            return responseHandler(err.message, false, '', 200, res);
            // return responseHandler("User with that email already exist!!", true, '', 200, res);
        }
        console.log(err)
        return responseHandler("Some error occured!", true, '', 200, res);
    }
}

