import { adminAction } from "../services/admin_services.mjs";
import { SignupInterns } from "../model/signup.mjs"
import { responseHandler } from "../helpers/responseHandler.mjs";
import { EmployeeDB, LegacyEmployeeDB } from "../model/employeeDb.mjs";
import { isValidObjectId } from "mongoose";

export const getEmployees = async (req, res) => {
    try {
        adminAction.getEmployees(res);
    } catch (error) {
        console.log(error);
    }
}

export const addEmployee = async (req, res) => {

    try {
        adminAction.addEmployee(req.body.email, res);
    } catch (error) {
        console.log(error);
        responseHandler(error.message,true,500,null,res);
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    try {
        if (!isValidObjectId(id))
            responseHandler('Invaid Emp_Id', true, null, 400, res);
        else {
            console.log(`Employee account to deleted : ${id}`)
            adminAction.deleteEmployee(id, res);
        }
    } catch (error) {
        console.log(error);
        responseHandler(error.message, true, null, 500, res);
    }
}

export const changeAvatar = async (req, res) => {
    try {
        console.log("File object [controller] => ", req.file);
        adminAction.changeAvatar(req.file, res);
    } catch (error) {
        console.log(error);
    }
}

export const updateEmployee = async (req, res) => {

    try {
        const employeeId = req.params.empId;

        let dataToUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
        }

        adminAction.updateEmployee(employeeId, dataToUpdate, res);
    } catch (error) {
        console.log(error);
        responseHandler(error.message, true, null, 500, res);
    }
}

//provide an id from signUpInterns to run this endpoint.
export const joineeVerify = async (req, res) => {
    const { params: { id } } = req;
    try {
        if (!isValidObjectId(id))
            responseHandler('Invaid joinee_ID', true, null, 400, res);
        else {
            console.log(`Joinee account ID to be updated : ${id}`)
            adminAction.joineeVerify(id, res);
        }
    } catch (error) {
        console.log(error);
        responseHandler(error.message, true, null, 500,res);
    }


}


// actions for signupInterns
export const getSignupInterns = async (req, res) => {

    try {
        adminAction.getSignupInterns(res);
    } catch (error) {
        console.log(error);
        responseHandler(error.message, true, null, 500, res);
    }
}

export const delSignupIntern = async (req, res) => {

    try {
        adminAction.delSignupIntern(req.body.email, res);
    } catch (error) {
        console.log(error);
        responseHandler(error.message, true, null, 500, res);
    }
}

