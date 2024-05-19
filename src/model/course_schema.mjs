import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        require: true,
        max: 30
    },
    description: {
        type: String,
        max: 300
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    }]
});

export const CourseDB = mongoose.model("Course", courseSchema);
