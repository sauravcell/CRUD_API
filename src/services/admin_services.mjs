import { ObjectId } from "mongodb";
import { SignupInterns } from "../model/signup.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs";
import mongoose from "mongoose";
import { EmployeeDB, LegacyEmployeeDB } from "../model/employeeDb.mjs";


export const getEmployees = async (res) => {
    try {
        const employees = await EmployeeDB.find();
        if (!employees) {
            return responseHandler("No employee found!!", false, '', 200, res);
        }

        return responseHandler({ employees }, false, '', 200, res);

    } catch (error) {
        console.log()
        console.log("Error in GET Employees => ", error);
        return responseHandler(error.message, true, '', 400, res);
    }
}

//provide an exisisting email from signupDB to run this endpoint.
export const addEmployee = async (email, res) => {
    let transaction = false;
    let session;
    try {
        const client = await mongoose.connect(process.env.mongo_URL);
        session = await client.startSession();
        session.startTransaction()
        const newUser = await SignupInterns.findOne({ email: email });
        
        if (!newUser) {
            return responseHandler(`Signup inform not found for the email ${email}`, false, '', 200, res);
        }

        const newEmployee = new EmployeeDB();
        newEmployee.firstName = newUser.firstName;
        newEmployee.lastName = newUser.lastName;
        newEmployee.email = newUser.email;
        newEmployee.password = newUser.password;
        newEmployee.phoneNumber = newUser.phoneNumber;
        newEmployee.employeeType = newUser.employeeType;
        newEmployee.addressLine1 = newUser.addressLine1;
        newEmployee.addressLine2 = newUser.addressLine2;
       
        transaction = true;
        const savedEmployee = await newEmployee.save();
        await SignupInterns.findByIdAndDelete(savedEmployee.ObjectId);


        session.commitTransaction();
        session.endSession();
        return responseHandler("Successfully added new employee!!", false, savedEmployee, 200, res);

    } catch (error) {
        if (transaction)
            session.abortTransaction();
        session.endSession();
        console.log("Couldn't add new employee => ", error);
        return responseHandler(error.message, true, '', 400, res);
    }
};

export const deleteEmployee = async (id, res) => {
    let transaction = false;
    let session;
    try {
        const client = await mongoose.connect(process.env.mongo_URL);
        session = await client.startSession();
        session.startTransaction();
        let employee = await EmployeeDB.findById(id);
        let legacyEmployee = new LegacyEmployeeDB();
        console.log(`${typeof (legacyEmployee)} && ${legacyEmployee}`);

        legacyEmployee.firstName = employee.firstName;
        legacyEmployee.lastName = employee.lastName;
        legacyEmployee.phoneNumber = employee.phoneNumber;
        legacyEmployee.email = employee.email;
        legacyEmployee.role = employee.role;
        legacyEmployee.password = employee.password;
        legacyEmployee.employeeType = employee.employeeType;
        legacyEmployee.addressLine1 = employee.addressLine1;
        legacyEmployee.addressLine2 = employee.addressLine2;
        legacyEmployee.joinedOn = employee.joinedOn;
        console.log(`${typeof (legacyEmployee)} && ${legacyEmployee}`);

        transaction = true;
        await legacyEmployee.save({ session: session });
        const removeEmployee = await EmployeeDB.findByIdAndDelete(employee.id, { session: session });
        await session.commitTransaction();
        await session.endSession();
        responseHandler('successfully deleted employee', false, removeEmployee.email, 200, res);
    }
    catch (error) {
        if (transaction == true)
            await session.abortTransaction();
        await session.endSession();
        responseHandler(error.message, true, null, 400, res);
    }
    finally {
        console.log('DB--Session ended.');
        await session.endSession();
    }

}

export const changeAvatar = async ( fileObj, res) => {

    try {
        console.log("File object : ", fileObj);
        console.log("File name : ", fileObj.originalname);

        // save the filename in the employeedb

        return responseHandler("Uploaded successful!!", false, '', 400, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 400, res);
    }
}

export const updateEmployee = async (employeeId, dataToUpdate, res) => {

    console.log(`Updating account [services] : ${employeeId}`);
    console.log(`Data to update [services] : ${dataToUpdate}`);

    try {

        // db.employees.find({ "_id": ObjectId("65f5c7bdaf2e4fbb56126f14") })
        // db.employees.findOneAndUpdate({ email:"john@mail.com" }, {$set:{ firstName:"john" }})

        console.log()
        console.log("dataToUpdate before update => ")
        for( let i in dataToUpdate) {
            console.log(dataToUpdate[i])
        }

        const employeeObj = new ObjectId(employeeId)
        const employee = await EmployeeDB.findOne({ _id: employeeObj });

        if(!employee) {
            return responseHandler("Employee with the ID not found!!", true, '', 400, res);
        }

        console.log("Employee found : ", employee);

        dataToUpdate.firstName?
            (dataToUpdate.firstName = dataToUpdate.firstName):
            (dataToUpdate.firstName = employee.firstName);

        dataToUpdate.lastName?
            (dataToUpdate.lastName = dataToUpdate.lastName):
            (dataToUpdate.lastName = employee.lastName);

        dataToUpdate.email?
            (dataToUpdate.email = dataToUpdate.email):
            (dataToUpdate.email = employee.email);

        dataToUpdate.role?
            (dataToUpdate.role = dataToUpdate.role):
            (dataToUpdate.role = employee.role);

        console.log();
        console.log("dataToUpdate after update => ");
        for( let i in dataToUpdate) {
            console.log(dataToUpdate[i]);
        }

        // updating and then saving employee data
        employee.firstName = dataToUpdate.firstName;
        employee.lastName = dataToUpdate.lastName;
        employee.email = dataToUpdate.email;
        employee.role = dataToUpdate.role;

        employee.save();

        return responseHandler("Data updated successfully!!", false, '', 400, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 400, res);
    }
}

// functions related to SignupInterns
export const getSignupInterns = async (res) => {

    try {
        const users = await SignupInterns.find();
        return res.status(200).json({ users })

    } catch (error) {
        console.log("Error fetching data => ", error);
        return responseHandler("No user found!", true, '', 404, res);
    }
};

export const delSignupIntern = async (userMail, res) => {

    console.log("User mail to delete : ", userMail);

    try {

        const user = await SignupInterns.findOneAndDelete({ email: userMail });

        if (user === null) {
            return responseHandler(`Failed!! The account with the email ${userMail} does not exist!`, true, '', 200, res);
        } else {
            console.log("Account deleted : ", user);
        }

        return responseHandler(`Success!! The account with the email ${userMail} has been deleted!`, false, '', 200, res);

    } catch (error) {
        console.log(error);
        return responseHandler(error.message, true, '', 400, res);
    }
};

export const joineeVerify = async (id, res) => {
    let transaction = false;
    let session;
    try {
        const client = await mongoose.connect(process.env.mongo_URL);
        session = await client.startSession();
        session.startTransaction()
        let joinee = await SignupInterns.findById(id);
        const data = {
            firstName: joinee.firstName,
            lastName: joinee.lastName,
            email: joinee.email,
            phoneNumber: joinee.phoneNumber,
            password: joinee.password,
            employeeType: joinee.employeeType,
            addressLine1: joinee.addressLine1,
            addressLine2: joinee.addressLine2,
        }
        const newEmployee = new EmployeeDB(data);
        transaction = true;
        const savedEmployee = await newEmployee.save();
        await SignupInterns.findByIdAndDelete(id);
        session.commitTransaction();
        session.endSession();
        responseHandler("New Employee details inserted successfully", false, savedEmployee, 200, res);
    }
    catch (error) {
        if (transaction == true)
            session.abortTransaction();
        session.endSession();
        console.log(error);
        responseHandler(error.message, true, null, 500, res);
    }
}


export const updateInterns = async (req, res) => {           // yet to complete

    const { params: { id } } = req;

    try {
        const data = await SignupInterns.findByIdAndUpdate(id, { isVerified: true });
        console.log(`verified joinee: ${data}`);

        return responseHandler('Joinee verified', false, '', 200, res);

    } catch (error) {
        console.log(`Joinee update error: ${error}`);

        return responseHandler(error.message, true, '', 500, res);
    }
};

export const adminAction = {
    getEmployees,
    addEmployee,
    deleteEmployee,
    changeAvatar,
    updateEmployee,
    deleteEmployee,
    getSignupInterns,
    joineeVerify,
    updateInterns,
    delSignupIntern
}
