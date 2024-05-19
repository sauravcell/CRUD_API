import { body } from "express-validator";

const phoneNoRegex = /^\d{10}$/;
const pinCodeReges = /^\d{6}$/;
const alphaCharsRegex = /^[A-Za-z]+$/;
const alphaCharsSpaceRegex = /^[A-Za-z ]+$/;
const strongPasswordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const alphaNumericSpaceRegex = /^[a-zA-Z0-9 ]*$/;

export const signupSchema = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage("Username is required!")
        .matches(alphaCharsRegex)
        .withMessage("Please enter a valid First name!!")
        .isLength({ min: 3, max: 20 })
        .withMessage("First name is less than 3 charachers. Please provide a proper name!"),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage("Last name is required!")
        .matches(alphaCharsRegex)
        .withMessage("Please enter a valid First name!!")
        .isLength({ min:3, max: 20 })
        .withMessage("Last name is less than 3 charachers. Please provide a proper name!"),
    body('email')
        .trim()
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Provide a valid email address!"),
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage("Phone number is required!")
        .matches(phoneNoRegex)
        .withMessage("Enter valid 10 digit number!"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Password field can't be empty!")
        .isStrongPassword(strongPasswordRegex)
        .withMessage("Your password is invalid. Please enter a valid password that is 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."),
    body('employeeType')
        .trim()
        .notEmpty()
        .withMessage("Type of employee field cannot be empty!")
        .matches(alphaCharsRegex)
        .withMessage("Not a valid employee type!!"),
    body('houseName')
        .trim()
        .notEmpty()
        .withMessage("House name not provided!!")
        .matches(alphaNumericSpaceRegex)
        .withMessage("House name can only have alphanumberic characters and space!!"),
    body('streetName')
        .trim()
        .notEmpty()
        .withMessage("Street name not provided!!")
        .matches(alphaCharsSpaceRegex)
        .withMessage("Only alphabetic characters and space is allowed!!"),
    body('cityName')
        .trim()
        .notEmpty()
        .withMessage("City name is required!!")
        .matches(alphaCharsSpaceRegex)
        .withMessage("Only alphabetic characters and space is allowed!!"),
    body('pinCode')
        .trim()
        .notEmpty()
        .withMessage("Pin code not provided!!")
        .matches(pinCodeReges)
        .withMessage("Enter a vaild Pin code!!"),
    body('state')
        .trim()
        .notEmpty()
        .withMessage("Street name not provided!!")
        .matches(alphaCharsSpaceRegex)
        .withMessage("Only alphabetic characters and space is allowed!!"),
    body('country')
        .trim()
        .notEmpty()
        .withMessage("Country not provided!!")
        .matches(alphaCharsSpaceRegex)
        .withMessage("Only alphabetic characters and space is allowed!!"),
];
