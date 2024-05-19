import { EmployeeDB } from "../model/employeeDb.mjs"

//to implement "filterDevelopers" by providable details
export const filterDeveloper = async (req, res,) => {
    try {
        const { email, firstName, lastName, phoneNumber } = req.query;
        const queryObject = {};

        if (email) {
            queryObject.email = email;
        }
        if (firstName) {
            queryObject.firstName = firstName;
        }
        if (lastName) {
            queryObject.lastName = lastName;
        }
        if (phoneNumber) {
            queryObject.phoneNumber = phoneNumber;
        }

        console.log(queryObject);

        const developers = await EmployeeDB.find(queryObject);
        console.log(developers)

        res.status(200).json({ developers });
    }

    catch (err) {
        console.error("error occured while fetching the developers:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//to implement "allDeveloperList" function
export const allDeveloperList = async (req, res) => {
    try {
        const developers = await EmployeeDB.find();
        res.status(200).json({ developers });
    }
    catch (err) {
        console.log("error occured while filtering the developers", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
