# Getting started


1. Install NPM modules :

        npm install

1. Create a new file in root of the project with the name `.env` and add the below two lines :

    ```
    mongo_URL : "<YOUR_MONGODB_URL>"
    PORT = <PORT_NUMBER_FOR_MONGODB>
    ```

1. Start your MongoDB server

1. Start the app by executing below command in the root of the project (i.e. form Das-Solutions folder and not from `/Das-Solutions/src`):

        npm run start:dev

1. Before making any changes create a new branch and switch to that branch :

        git branch test  # creates new branch with the name `test`
        git checkout test  # switch to a branch named `test`


## Key points

* The file `app.js` is located at `/src/app.js`.
* The database schema are located at `/src/model/`.
* Input validations are located at `/src/validation_schema`
* When creating a new API route, understand the file `/src/routes/route_index.mjs`. Understand how different routes are defined and imported from different file.

# Naming conventions to follow

1. Every variable or function name will be in **camelCase**, example `addEmployee`, `responseHandler`.
1. Every database schema will be in **PascalCase**, example `SignupInterns`, `EmployeeDB`.
1. Route path will be in **snake_case**, example `/admin_controller.mjs` or `/add_employee`.


## Dependencies

1. Express
1. Mongoose
1. Bcrypt
1. Dotenv
1. Nodemon
1. Jsonwebtoken
1. Moment
1. Multer
1. Nodemailer
1. Otp generator
1. Passport

