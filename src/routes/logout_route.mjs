import { Router } from "express";
import { logout } from "../controllers/employee_controller.mjs";

const route = Router();


route.get('/', logout);
/**
 * @swagger
 * /logout:
 *  get:
 *      summary: User logout
 *      description: Removes the cookie containg the login token and then user needs to login again
 *      responses:
 *          200:
 *              description: Log out successfull
 *          500:
 *              description: Logout failed
 * 
 */


export default route;
/* 

*/