// db connection
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.mongo_URL)
    .then(() => {
            console.log(`Connected to database and using database`);
    }).catch((error) => {
        console.log(`DB Connection-state value: ${mongoose.connection.readyState}`);
        console.log(`Could not Connected to database ${error}`);
    })



export default mongoose;
