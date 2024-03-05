QuickWallet

This repository contains the source code for a payTm-like-system built using React-js,Node.js, Express.js, MongoDB,Tailwind and JSON Web Tokens (JWT) for authentication.
Features

    User Authentication: Users can sign up and sign in securely using JWT authentication.
    Account Balances: Users can view their account balances and perform financial transactions.
    Transaction Rollback: Implemented transaction rollback functionality to ensure data integrity during fund transfers.
    Data Persistence: Uses MongoDB for data storage, ensuring reliability and scalability.
    Middleware: Utilizes middleware for authentication and session management.
    Decimal Precision: Implements integer-based storage for account balances to handle decimal precision errors effectively.

Getting Started

    Clone the repository to your local machine.
    Install dependencies using npm install.
    Set up your MongoDB database
    Run the server using npm start.
    Use Postman or a similar tool to interact with the API endpoints.

Endpoints

    POST /signup: Create a new user account.
    POST /signin: Authenticate and sign in a user.
    GET /balance: Retrieve the account balance for the authenticated user.
    POST /transfer: Transfer funds between accounts securely.

Dependencies

    Express.js: Web framework for building APIs
    MongoDB: NoSQL database for data storage
    Mongoose: ODM for MongoDB, simplifying database interactions
    bcryptjs: Library for password hashing
    jsonwebtoken: Library for creating and verifying JSON Web Tokens
