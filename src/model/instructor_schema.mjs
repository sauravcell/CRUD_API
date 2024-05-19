import mongoose from "mongoose";

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
})

export const Instructor = mongoose.model("Instructor", instructorSchema);
