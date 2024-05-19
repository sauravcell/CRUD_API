import { Router } from "express";
import { adminVerify, employeeVerify } from "../helpers/authorizer.mjs";
import signup_route from "./signup_route.mjs";
import login_route from "./login_route.mjs";
import logout_router from "./logout_route.mjs"
import admin_router from "./admin_router.mjs";
import employee_router from "./employee_router.mjs";
import developers_router from "./developers_router.mjs";
import account_recover_router from "./account_router.mjs";
import instructorRouter from "./instructor_router.mjs";
import zipcode_route from "./zipcode_route.mjs";
import courseRouter from "./questions_router.mjs";

const routes = Router();

routes.use("/signup", signup_route);
routes.use("/login", login_route);
routes.use("/logout", logout_router);
routes.use("/admin", adminVerify, admin_router);
routes.use("/employee", employeeVerify, employee_router);
routes.use("/forgot_password", account_recover_router);
routes.use("/developer_action", adminVerify, developers_router);
routes.use("/address", zipcode_route);
routes.use("/course", courseRouter);
routes.use("/test", instructorRouter);

export default routes;

