import multer from "multer";
import { responseHandler } from "./responseHandler.mjs";

// how to handle file size and
// how to how to return error instead of throwing directly 
const fileFilter = (req, file, cb) => {

    console.log("File => ", file)

    let fileAllowed = true;

    if ( file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/heic') {
        console.log("File not allowed!! 1")
        // throw new Error("File type error!! Only PNG, JPG, JPEG and HEIC are allowed!")
        cb (new Error("Filetype error!! Only PNG, JPG, JPEG and HEIC are supported!!"));
        fileAllowed = false;
    }

    /*
    if ( file.size > 5000 ) {
        console.log("")
        throw new Error("File size should be less than 500 KB!!")
        fileAllowed = false;
    }
    */

    console.log("File allowed? : ", fileAllowed);
    console.log("Request => ", req)
    cb(null, fileAllowed);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname)
    },
});

export const upload = multer({
    storage,
    limits: {
        // limits file size to 500 kb
        fileSize: 1024 * 500
    },
    fileFilter,
    onError: (err, next) => {
        console.error('Error during upload:', err);
        if (err.code === 'ENOENT') {
            console.error('Destination directory does not exist!');
        }
        next(err);
    }
});

/*
export const checkError = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error("Some error occured during upload!!")
        }
        // Everything went fine.
    })
}
*/
