import mongoose from "../database.mjs";

const Schema = mongoose.Schema;

const questionbankSchema = new Schema({
	courseName:{
		type: String,
		require: true,
		trim: true,
	},
    courseID:{
		type: Schema.Types.ObjectId,
		required: true,
	},
	question :{
		type: String,
        required: true
	}
})

export const QuestionDB = mongoose.model("QuestionBank", questionbankSchema);
