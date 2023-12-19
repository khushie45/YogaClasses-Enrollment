# Yoga Classes Enrollment Form

## Overview

This project implements a simple admission form for Yoga Classes. The form allows users to enroll in monthly classes, specifying details like name, age, email, mobile number, enrolled batch, and payment status.

## Features

- Only individuals within the age range of 18-65 are allowed to enroll.
- Monthly fees of 500/- Rs INR are applicable, payable any time during the month.
- Users can choose from four batches: 6-7AM, 7-8AM, 8-9AM, and 5-6PM.
- Participants can switch batches each month but must remain in the same batch for the entire month.

## Implementation

### Frontend

- The frontend is built using React.
- A responsive form is provided to collect user details.
- For styling, pure css is being used.
- Basic validations are performed on the client side to ensure data integrity.
- Users are prompted to complete all required fields and adhere to age limits.
- The payment process is initiated by clicking on Pay 500 rupees.

### Backend

- The backend is implemented using Node.js and Express.
- A MongoDB database is used to store user enrollment details.
- A RESTful API receives form submissions, performs basic validations, stores data.
- The API returns responses to the frontend if the payment is successful or not.

## Database Schema

### User

- UserID (Primary Key)
- Name
- Age
- Email
- MobileNumber
- EnrolledBatch
- PaymentStatus
- EnrollmentDate

## Hosting

- The application is hosted on Netlify for the frontend and Render for the backend.
- The live application can be accessed at [Live Demo](https://yoga-classes-enrollment.netlify.app/).
- For backend: https://yogaclasses-enrollment.onrender.com
- To get all users info: [API](https://yogaclasses-enrollment.onrender.com/all-users)

## How to Run Locally

1. Clone the repository.
2. Navigate to the `client` folder and run `npm install` to install frontend dependencies.
3. Run `npm start` to start the React development server.
4. Navigate to the `server` folder and run `npm install` to install backend dependencies.
5. Run `npm start` or `npm run dev` to start the Express server.

## Acknowledgments

- This project is part of FlexMoney Assignment for Internship 2024.

