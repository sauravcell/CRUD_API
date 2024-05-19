import { QuestionDB } from "../model/questionbank_DB.mjs";
import { CourseDB } from "../model/course_schema.mjs"
import { responseHandler } from "../helpers/responseHandler.mjs";


// Function to get all questions under a particular course
export const filterQuestion = async (courseName, limit, page, res) => {
    try {
        // 127.0.0.1:8000/filterAllquestions?courseName=Python&limit=3&page=1

        console.log("Page : ", page)
        console.log("Limit : ", limit)

        if (!courseName) {
            return responseHandler("Course name is required", true, null, 400, res);
        };

        const questions = await QuestionDB
            .find({ courseName: courseName })
            .skip(page * limit)
            .limit(limit);

        if (questions.length === 0 || !questions) {
            return responseHandler("No questions found for the specified course", true, null, 404, res);
        };

        return responseHandler({ questions }, false, "", 200, res);
    }
    catch (err) {
        console.error("Error occured while fetching the questions:", err);
        console.log(err.message);
        return responseHandler("Internal server error", true, null, 500, res);
    };
};

export const addCourseQuestion = async (courseName, question, courseID, res) => {
    try {

        const course = await CourseDB.findOne({ _id: courseID });

        if (!course) {
            return responseHandler("Cannot find the course mentioned!!", false, null, 200, res);
        }

        console.log("Course name : ", course.courseName);

        const newQuestion = new QuestionDB({
            courseName: course.courseName,
            courseID,
            question
        });

        await newQuestion.save()

        return responseHandler("Question added successfully!!", false, null, 200, res);

    } catch (err) {

        return responseHandler(err.message, true, null, 500, res);
    }
}
