import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    state: {
        type: String,
        required: true
    },
    district: {
        type: [String],
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },

});

export const Address = mongoose.model("Address", addressSchema);
