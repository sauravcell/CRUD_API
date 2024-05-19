import express from "express";
import dotenv from "dotenv";
import mongoose from "./database.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { pathmiddleWare } from "./helpers/path.mjs";
import routes from "./routes/route_index.mjs";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.mjs';


dotenv.config();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('../swagger');

const swaggerUiOptions = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

app.use(express.json()); // this should be at the top or else give error
app.use(cookieParser());
app.use(session({
    secret: process.env.session_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 5     //5 mins
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 60 * 10             // 10 mins
    }),
}));
app.use(pathmiddleWare);
app.use(routes);


const port = process.env.PORT;




app.get('/', (req, res) => {

    res.status(200).json({
        signup_route: "/signup",
        admin_route: "/admin",
        login_route: "/login",
        employee_route: "/employee"
    })
})


app.get("/*", (req, res) => {
    res.status(404).json({
        error: "Route not found!"
    });
})

app.listen(port, () => {
    console.log(`Sever is running on port ${port}.`);
    console.log('Connecting to database...');
})
