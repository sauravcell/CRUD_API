import { Router } from "express";
import { dashboard, fileUpload, logout } from "../controllers/employee_controller.mjs";
import { upload } from "../helpers/upload_diskStorage.mjs";



const employeeRouter = Router();

employeeRouter.post('/upload', upload.single('file'), fileUpload);
employeeRouter.get('/user-dashboard/',dashboard);

export default employeeRouter;

/**
 * @swagger
 * /employee/user-dashboard:
 *  get:
 *      summary: Display user dash board.
 *      description: Returns the details of the curently logged in user.
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: failed to get user-dashboard 	
 */
