import { responseHandler } from "../helpers/responseHandler.mjs";
import { EmployeeDB } from "../model/employeeDb.mjs";
import { signPayload } from "../helpers/jwt_token.mjs";
import { comparePassword } from "../helpers/encrypt.mjs";


export const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await EmployeeDB.findOne({ email: email });
		if (!user || !comparePassword(password, user.password))
			responseHandler('Invalid  email / password', true, null, 400, res);
		else {
			const token = signPayload(user.email + ' ' + user.role, 60*30);		//30 mins
			res.cookie('id', token, {maxAge: 1000*60*30});
			responseHandler('Login successsfull', false, token, 200, res);
		}
	} catch (error) {
		console.log({ 'Login error': error });
		responseHandler(error.message, true, null, 500, res);
	}
}

