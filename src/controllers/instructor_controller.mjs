import { instructor } from "../services/instructor_services.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs";

export const showInstructors = (req, res) => {
    try {
        instructor.showInstructors(res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}

export const showInstructor = (req, res) => {
    try {
        console.log("[constroller] Params received : ", req.params);
        instructor.showInstructor(req.params.instructorID, res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}

export const addInstructor = (req, res) => {
    try {
        console.log("[constroller] Params received : ", req.params);
        instructor.addInstructor(req.params.instructorID, res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}

export const addCourse = (req, res) => {
    try {
        instructor.addCourse(req.body.courseName, req.body.description, req.body.instructors, res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}

export const showCourseS = (req, res) => {
     try {
        instructor.showCourseS (res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}

export const showCourse = (req, res) => {
     try {
        instructor.showCourse( req.params.courseID, res);
    } catch (error) {
        console.log("[controller] Error => ", error);
        responseHandler(error.message, true, '', 500, res);
    }
}
