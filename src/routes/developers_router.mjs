import express from "express";

import { allDeveloperList, filterDeveloper } from "../controllers/developers_controller.mjs";

const router = express.Router();

router.get("/developers", allDeveloperList); //to get the list of develoeprs

router.get("/filter_developers", filterDeveloper); //to filter the developers by the specific details

export default router;

/**
 * @swagger
 * /developer_action/getAllDevelopers:
 *  get:
 *      summary: Fetch all developers
 *      description: Details of all developers is returned.
 *      responses:
 *          200:
 *              description: developers details fetched	
 *          500:
 *              description: failed to get developers details	
 */
