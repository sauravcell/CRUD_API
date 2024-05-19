import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config();
const secretKey = process.env.jwt_key;    //secret ket for jwt token

export const signPayload = (payload, time) => {
    console.log(`jwt_sign payload: ${payload}`);

    const token = jwt.sign({ payload: payload }, secretKey, { expiresIn: time });
    console.log(`jwt token generated : ${token}`);
    return token;
}

export function verifyToken(token) {
    console.log(`jwt_verify token: ${token}`);

    try {
        const verify = jwt.verify(token, secretKey);
        if (verify)
            return true;
        else
            return false;
    } catch (error) {
        console.log(`jwt verify err: ${error}`);
        return false;
    }
}

export function decPayload(token) {
    const data = jwt.decode(token);
    return data;
}

