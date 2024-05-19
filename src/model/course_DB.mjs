import mongoose from "../database.mjs";
const courseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: true,
		max: 30,
	},
	description: {
		type: String,
	},
	questionbankID: {
		type: mongoose.SchemaTypes.ObjectId,
	},
});

export const courseDB = mongoose.model("course", courseSchema);