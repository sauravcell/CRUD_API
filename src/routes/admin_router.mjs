import { Router } from "express";
import {
    getEmployees,
    addEmployee,
    deleteEmployee,
    joineeVerify,
    changeAvatar,
    updateEmployee,
    getSignupInterns,
    delSignupIntern
} from "../controllers/admin_controller.mjs";
import { inputSchema } from "../validation_schema/update_employee_schema.mjs";
import { validateInputSchema } from "../helpers/input_validator.mjs";
import { upload } from "../helpers/upload_diskStorage.mjs";

const adminRouter = Router();

adminRouter.get("/", (req, res) => {
  res.status(200).json({
    add_employee: "post: /employee",
    delete_employee: "delete: /employee",
    update_employee: "patch: /employee/:empId",
    joinee_verify: "patch: /joineeVerify",
    get_all_users: "get: /signup_users",
    delete_signup_user: "delete: /signup_user"
  });
}); 


adminRouter.get("/employees", getEmployees);

adminRouter.post("/employee", addEmployee);

adminRouter.post(
    "/employee/avatar",
    upload.single('avatar'),
    changeAvatar
);

adminRouter.delete("/employee", deleteEmployee);

adminRouter.patch(
    "/employee/:empId",
    inputSchema,
    validateInputSchema,
    updateEmployee
);

adminRouter.patch("/joineeVerify/:id", joineeVerify);
adminRouter.get("/signup_users", getSignupInterns);
adminRouter.delete("/signup_user", delSignupIntern);

export default adminRouter;

/**
 * @swagger
 * /admin/add_employee:
 *   post:
 *     summary: add new employee
 *     description: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                  type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, missing required parameters
 *       409:
 *         description: Conflict, user with provided email already exists
 */

/**
 * @swagger
 * /admin/delete_employee:
 *   post:
 *     summary: Delete employee
 *     description: Delete a employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Delete employee successfully
 *       400:
 *         description: Bad request, missing required parameters
 *       409:
 *         description: Conflict, user with provided email already exists
 */


/**
 * @swagger
 * /admin/update_employee/{empId}:
 *   post:
 *     summary: update employee
 *     description: update employee
 *     parameters:
 *      - in: path
 *        name: empId
 *        required: true
 *        description: empId of the resource
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                  type: string
 *     responses:
 *       201:
 *         description: Employee successfully deleted
 *       400:
 *         description: Bad request, missing required parameters
 */


/**
 * @swagger
 * /admin/joinee_verify/:id:
 *  patch:
 *      summary: Add new employee using signup id.
 *      description: Verify and move a registered user to employee collection.
 *      parameters:
 *          in: path
 *          name: id
 *          required: true
 *          description: object_ID from signup collection.
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: New Employee details inserted successfully. 
 *          400:
 *              description: Invalid ID
 *          500:
 *              description: Failed to add new employee
 */


/**
 * @swagger
 * /admin/get_signup_users:
 *   get:
 *     summary: get signup users
 *     description: get all users list
 *     responses:
 *       201:
 *         description: show all users
 *       400:
 *         description: Bad request, missing required parameters
 */


/**
 * @swagger
 * /admin/delete_signup_user:
 *   post:
 *     summary: Delete signup users
 *     description: Delete a users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete signup user successfully
 *       400:
 *         description: Bad request, missing required parameters
 *       409:
 *         description: Conflict, user with provided email already exists
 */



