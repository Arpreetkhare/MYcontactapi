# MyContactAPI

## Overview
**MyContactAPI** is a RESTful API built using **Node.js** and **Express.js** for managing user accounts and contacts. This API provides JWT-based authentication, enabling users to securely perform CRUD operations on their contacts. The application is containerized using Docker for easy deployment and scalability.

---

## Features

- **User Authentication**: 
  - Register and log in users.
  - JWT-based token authentication for secure endpoints.

- **Contact Management**:
  - Create, update, retrieve, and delete contacts.
  - Retrieve all user contacts with secure access.

- **Secure Access**:
  - Middleware to validate JWT tokens for protected routes.

- **Containerized Deployment**:
  - Dockerized with support for MongoDB as the database.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Docker

---

## API Endpoints

### **User Authentication**
| **Method** | **Endpoint**       | **Description**                  |
|------------|--------------------|----------------------------------|
| POST       | `/api/users/register` | Register a new user              |
| POST       | `/api/users/login`    | Log in and get a JWT token        |
| GET        | `/api/users/current`  | Get the current logged-in user (protected) |

### **Contact Management**
| **Method** | **Endpoint**            | **Description**                   |
|------------|-------------------------|-----------------------------------|
| GET        | `/api/contacts/getAll`  | Retrieve all user contacts (protected) |
| POST       | `/api/contacts/create`  | Create a new contact (protected)      |
| GET        | `/api/contacts/get/:id` | Retrieve a specific contact (protected) |
| PUT        | `/api/contacts/update/:id` | Update an existing contact (protected) |
| DELETE     | `/api/contacts/delete/:id` | Delete a contact (protected)         |

---

## Installation

### Installation Without Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MyContactAPI.git
   cd MyContactAPI
2. **Install dependencies:**
   ~~~bash
   npm install
3. **Start the application:**
   ```bash
   npm start
4. **Access the API at:**
    http://localhost:5001

### Installation With Docker

 **Build and run the containers:**
   ```bash
   docker-compose up --build
---

   
   
