import { Router } from "express";
import { body,query,param } from "express-validator";
import { validateInputSchema } from "../helpers/input_validator.mjs";
import { showInstructors, showInstructor, addInstructor, addCourse, showCourse, showCourseS } from "../controllers/instructor_controller.mjs"


const alphaCharsRegex = /^[A-fa-f0-9]+$/;
const hexRegex = /(0x)?[0-9a-f]{24}$/;
const id_length = 24;

const instructorRouter = Router();

instructorRouter.get('/instructors', showInstructors);  // no validation required
instructorRouter.get('/instructor/:instructorID',
    [
        param('instructorID')
            .trim()
            .notEmpty()
            .withMessage("Provide at least one instructor name!!")
            .isHexadecimal()
            .withMessage("Not a valid hexadecimal!!")
            .isLength({ min: id_length, max: id_length })
            .withMessage("Not a valid hexadecimal!! Length did not match!!")
    ],
    validateInputSchema,
    showInstructor
);

// validation for instructorID, 32 bytes hexadecimal
instructorRouter.post('/instructor/:instructorID',
    [
        param('instructorID')
            .trim()
            .notEmpty()
            .withMessage("Provide at least one instructor name!!")
            .isHexadecimal()
            .withMessage("Not a valid hexadecimal!!")
            .isLength({ min: id_length, max: id_length })
            .withMessage("Not a valid hexadecimal!! Length did not match!!")
    ],
    validateInputSchema,
    addInstructor
);


// course realted routes

instructorRouter.get('/courses', showCourseS);
instructorRouter.get('/course/:courseID',
    [
        param('courseID')
            .trim()
            .notEmpty()
            .withMessage("Provide at least one instructor name!!")
            .isHexadecimal()
            .withMessage("Not a valid hexadecimal!!")
            .isLength({ min: id_length, max: id_length })
            .withMessage("Not a valid hexadecimal!! Length did not match!!")
    ],
    validateInputSchema,
    showCourse
);

// validation for course (courseName, description, instructors, res)
instructorRouter.post('/course',
    [
        body('courseName')
        .trim()
        .notEmpty()
        .withMessage("Course name is required!!"),
        body('description')
        .trim()
        .notEmpty()
        .withMessage("Provide description!!"),
        body('instructors')
        .trim()
        .notEmpty()
        .withMessage("Provide at least one instructor ID!!")
        .custom( val => {
            return Array.isArray(val)?true:false
        })
        .withMessage("Input should be an array!!")
    ],
    validateInputSchema,
    addCourse
);

export default instructorRouter;
