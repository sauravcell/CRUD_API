import { ObjectId } from "mongodb";
import { Instructor } from "../model/instructor_schema.mjs";
import { CourseDB } from "../model/course_schema.mjs";
import { EmployeeDB } from "../model/employeeDb.mjs";
import { responseHandler } from "../helpers/responseHandler.mjs";


const addInstructor = async( employeeId, res) => {
    try {

        const employeeObj = new ObjectId(employeeId);

        const employee = await EmployeeDB.findOne({ _id:employeeObj });
        if (!employee) {
            console.log("Employee with that ID not found!!")
            return responseHandler("Employee with that ID not found!!", false, '', 200, res);
        }

        const instructorInDB = await Instructor.findOne({ instructor:employeeObj });
        if ( instructorInDB ) {
            console.log("Employee already in the database!!")
            console.log(instructorInDB)
            return responseHandler("Employee already in the database!!", false, '', 200, res);
        }

        const instructor = new Instructor({
            instructor : employeeId,
            course: [],  // have to send empty value for first time
        });

        await instructor.save();
        return responseHandler("Data saved successfully!!", false, '', 200, res);

    } catch(error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}


const showInstructors = async(res) => {
    try {
        const instructors = await Instructor.find().populate("instructor").exec();

        if (!instructors) {
            console.log("[service] No instructors found!!");
            responseHandler("[service] No instructors found!!", false, '', 200, res);
        }

        return responseHandler({instructors}, false, '', 200, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}

const showInstructor = async(instructorID, res) => {
    try {
        console.log("[service] Instructor ID : ", instructorID);

        const instructorObj = new ObjectId(instructorID);
        const instructor = await Instructor.findOne({ _id:instructorObj }).exec();

        if(!instructor) {
            return responseHandler(`Instructor with ID : ${instructorID}, does not exist!!`, false, '', 200, res);
        }

        return responseHandler(instructor, false, '', 200, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}

// course related functions
const addCourse = async( courseName, description, instructors, res) => {
    console.log()
    console.log("Add course route => ")
    try {
        console.log("[services] Course name : ", courseName);
        console.log("[services] Description : ", description);
        console.log("[services] Instructors : ", instructors);

        const course = new CourseDB({
            courseName,
            description,
            instructors
        })

        const savedCourse = await course.save();
        const courseId = savedCourse._id;

        console.log("Course ID : ", courseId);

        for ( let i in instructors) {
            console.log("Instructor : ", instructors[i]);

            const instructorObj = new ObjectId(instructors[i]);

            // handle ids that does not exist in instructor db
            const result = await Instructor.findOneAndUpdate(
                {_id: instructorObj},
                {$push: { courses: savedCourse._id }}
            );

            await result.save()

            // handle error if the instructor ID does not exist
        }

        return responseHandler("Course data received!!", false, '', 200, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}


const showCourse = async (courseId, res) => {
    try {
        const course = await CourseDB.findOne({ _id: courseId });

        if (!course) {
            return responseHandler(`Course with ID ${courseId} does not exist!!`, false, '', 200, res);
        }

        return responseHandler({course}, false, '', 200, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}


const showCourseS = async (res) => {
    try {
        const courses = await CourseDB.find();

        if (!courses) {
            return responseHandler("Course list empty at the moment!!", false, '', 200, res);
        }

        return responseHandler({courses}, false, '', 200, res);

    } catch (error) {
        return responseHandler(error.message, true, '', 500, res);
    }
}



export const instructor = {
    addInstructor,
    showInstructors,
    showInstructor,
    addCourse,
    showCourse,
    showCourseS
}
