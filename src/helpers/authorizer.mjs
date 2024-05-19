import { decPayload, verifyToken } from "./jwt_token.mjs";
import { responseHandler } from "./responseHandler.mjs";

function loginStatus(id) {
	console.log({ 'cookies_details:-': id });

	if (id == undefined || !verifyToken(id)) {
		return undefined;
	}
	else {
		const data = decPayload(id);
		const role = data.payload.split(' ');
		console.log(role[1]);
		return role[1];
	}
}

export const adminVerify = (req, res, next) => {

	const role = loginStatus(req.cookies.id)
	if (role == undefined)
		responseHandler('Login in to continue', true, null, 400, res);
	else if (role == 'admin') {
		next();
	} else {
		responseHandler('Access Denied', true, null, 400, res);
	}
}

export const employeeVerify = (req, res, next) => {
	const role = loginStatus(req.cookies.id)
	if (role == undefined)
		responseHandler('Login in first to continue', true, null, 400, res);
	else if (role == 'employee' || role == 'admin') {
		next();
	} else {
		responseHandler('Access Denied', true, null, 400, res);
	}

}
