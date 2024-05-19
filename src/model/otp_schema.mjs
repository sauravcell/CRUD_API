import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    otp : {
        type: Number,
        required: true,
    },
    otpAccessed : {
        type: Boolean,
        required: true,
        default: false
    },
    timestamp : {
        type: Number,
        required: true
    },
    retries : {
        type: Number,
        required: true
    }
});

// export default mongoose.model("SentOTP", otpSchema);
export const SentOTP = mongoose.model("SentOTP", otpSchema)
