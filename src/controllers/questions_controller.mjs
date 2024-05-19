import { filterQuestion, addCourseQuestion } from "../services/questions_services.mjs";

//to implement "filterQuestion" function
export const allQuestions = async (req, res) => {
    try {
        const courseName = req.query.courseName;
        const limit = req.query.limit || 3;
        const page = req.query.page || 0;  // add validation for courseName, limit and page at its router file

       await filterQuestion(courseName, limit, page, res);
    }
    catch (err) {
        console.log(err);
    }
};

export const addQuestion = async (req, res) => {
    try {
        addCourseQuestion (req.body.courseName, req.body.question, req.body.courseID, res);
    } catch (err) {
        console.log(err);
    }
}
