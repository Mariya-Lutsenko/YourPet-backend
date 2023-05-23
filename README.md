# YourPet Backend API

This is the repository of the YourPet Backend API project, which provides an API to interact with the YourPet application.
It provides a solution for managing data resources in a web application with support for basic CRUD functions using GET, POST, PATCH and DELETE methods.

![image](https://res.cloudinary.com/dzbevpbos/image/upload/v1684830286/YourPets_b5hzot.jpg)

## Project review

This project implements the server part of the YourPet application. It is built on Node.js, using the Express.js framework to implement the API and Mongoose to interact with the MongoDB database.

## Requirements

Before starting work with the project, make sure that the following tools are installed on your computer:

- Node.js (version 12 or higher)

## Tools

YourPet Backend API is built using the following tools:

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [Cloudinary](https://cloudinary.com/)

## Installation

To install YourPet Backend API, follow these steps:

1. Open a terminal and clone the YourPet Backend API repository to your local machine using `git clone https://github.com/Mariya-Lutsenko/YourPet-backend.git`.
2. Navigate to the project directory using `cd YourPet-backend`.
3. Install dependencies using `npm install`.

## Configuration

1. Create an `.env` file in the root of the project.
2. Specify the necessary environment variables in this file.

### Commands:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
