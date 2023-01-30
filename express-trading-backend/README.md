# Express Trading Backend Application

## Introduction
The Express Trading Backend Application is a backend application that configures a server and provides API endpoints for a front-end trader application. The application implements RESTful APIs to perform CRUD operations on trader and quote data. The server provides operations to add, update and delete trader accounts, deposit and withdraw trader funds and get quote information.

Technologies used are Express.js, Node.js, JavaScript, MySQL and VS Code.

## Quick Start
Run the following command from the root project directory:
```
npm run start
```

## Implemenation
The application was implemented using the Express framework for setting up the API endpoints. The Sequelize ORM was used to interact with a MySQL database to manage the data.

## Test
The application was tested manually using Postman. Each API was tested individually using different sets of inputs and compared to the expected output. All features are working as intended.

## Deployment
Source code is managed by GitHub.

## Improvements
- Add authentication to secure sensitive data
- Provide data validation
- Format response objects to match front-end application