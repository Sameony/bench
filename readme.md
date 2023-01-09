# Hi! Welcome to student management portal

## Steps to run the application locally

### 1. clone the project into your system
        Use the git clone command or download the zip file of the project.
### 2. Install node modules
        run `npm i` or `npm install`
### 3. Go to localhost:3001
        Register a teacher or Sign in using existing teacher.
        Dummy teacher user: dummy@gmail.com || password: abc123
        Dummy user: rollno: 1 || dob: 27/07/2021
        bcrypt has been used for encryption.
        Database access is currently set open to any ip, however, do change the database connection uri with your own database, as i will gradually close the access after some time.
### Tech stack and dependencies
        1. Project is made using Node js
        2. Handlebars templating engine is used for the views.
        3. MongoDB is used for the database
        4. Mongoose is used for interacting with the database and schemas.