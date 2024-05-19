import mongoose from "mongoose";
import { date_time } from "../helpers/getDate.mjs";
const Schema = mongoose.Schema;

const signupSchema = new Schema({
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
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        required: true,
        default: "expected_joinee",
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
    timestamp: {
        required: true,
        type: String,
        default: date_time,
    }

});

export const SignupInterns = mongoose.model("SignupIntern", signupSchema);
// here the SignupIntern will be the COllection name in singlar form
