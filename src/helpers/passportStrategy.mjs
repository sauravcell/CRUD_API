import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "./encrypt.mjs";
import { EmployeeDB } from "../model/employeeDb.mjs";

passport.serializeUser((user,done)=>{
    done(null,user.email);
});

passport.deserializeUser(async(email, done)=>{
    try {
        const findUser= await EmployeeDB.findOne({email: email});
        done(null,findUser);
    }
    catch (error){
        console.log(error);
        done('Email not found',null);
    }
});

export default passport.use(
    new Strategy({usernameField:'email'},async(email,password,done)=>{
        try {
            const findUser=await EmployeeDB.findOne({email:email});
            if(comparePassword(password, findUser.password))
                done(null,findUser);
            else{
                console.log('Incorrect password');
                done('Invalid Password',null);
            }
        } catch (error) {
            console.log(error);
            done('Email not registered',null);
        }
    })
);
