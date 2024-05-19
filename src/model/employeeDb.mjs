import mongoose from "mongoose";
import { date_time } from "../helpers/getDate.mjs";


const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'employee',
    },
    employeeType: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    joinedOn: {
        type: String,
        required: true,
        default: date_time,
    }

});

const legacyEmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    employeeType: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    joinedOn: {
        type: String,
        required: true,
    },
    removedOn: {
        type: String,
        required: true,
        default: date_time,
        // default: local, 
    }
})

export const LegacyEmployeeDB = mongoose.model("LegacyEmployee", legacyEmployeeSchema);   //used for soft-delete employee

export const EmployeeDB = mongoose.model("Employee", employeeSchema);

