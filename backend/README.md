# Vortex Cubes Website Backend

A secure, performance-oriented REST API backend built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. This service acts as the backend administrative engine for the Vortex Cubes website, enabling secure user authentication and dynamic management of bench resources.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Project Architecture & Directory Structure](#project-architecture--directory-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Seeding](#database-seeding)
  - [Migration Scripts](#migration-scripts)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Health Check](#health-check)
  - [Authentication Routes](#authentication-routes)
  - [Bench Resource Routes](#bench-resource-routes)
- [Database Models](#database-models)
- [Middleware Implementation](#middleware-implementation)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

The Vortex Cubes Backend provides the administrative framework and public API data layers for managing the company's "bench resources". The system integrates role-based security, auto-sequencing list indexes (via sort-order shifts), automated data migrations (for technology tags and multi-currency formats), and robust input validation to support seamless operations on the frontend application.

---

## Key Features

* **Secure Admin Authentication**: Implements JWT-based stateless session handling. Passwords are safe-hashed on creation and login verification using `bcryptjs` with salt round factor 12.
* **Auto-adjusting Drag-and-Drop Sorting Support**: When an administrator creates, edits, or deletes bench resource cards, the server automatically updates and shifts indices (`sortOrder`) to prevent gaps or duplicate display ranks.
* **Mongoose Schema Validations**: Restricts resource profiles to valid states (e.g., non-empty tag arrays, positive integer boundaries for experience, clean trims).
* **Automated Migration Helpers**: Includes specialized utility scripts to transform values in batch (e.g. converting hourly USD rates to localized INR range formats and cleanup of legacy tech tag classifications).

---

## Project Architecture & Directory Structure

The codebase is structured following a clean, modular Model-Controller-Route architectural pattern.

```
VortexCubesWebsiteBackend/
├── .env.example                     # Environment template configuration file
├── package.json                     # System dependencies and npm scripts configuration
├── package-lock.json                # Lockfile for installation consistency
├── README.md                        # Project documentation (this file)
└── src/
    ├── server.js                    # Application entry point & service bootstrap
    ├── config/
    │   └── db.js                    # MongoDB Mongoose connection config
    ├── controllers/
    │   ├── authController.js        # Logic for admin signup, login, and token issuance
    │   └── benchResourceController.js# CRUD and ordering logic for bench resources
    ├── middleware/
    │   ├── authMiddleware.js        # Bearer token parsing and admin checks
    │   └── errorMiddleware.js       # Global 404 handler and server error handler
    ├── models/
    │   ├── AdminUser.js             # Mongoose schema for Admin profile
    │   └── BenchResource.js         # Mongoose schema for Bench Candidate profile
    ├── routes/
    │   ├── authRoutes.js            # Authentication routing table
    │   └── benchResourceRoutes.js   # Bench resource routing table
    ├── scripts/
    │   ├── migrateRates.js          # Migration script: chargePerHour -> monthlyRate
    │   ├── migrateRatesToINR.js     # Migration script: USD rates -> INR monthly ranges
    │   └── migrateTechStacks.js     # Migration script: normalizes/maps tech stack categories
    └── seed/
        └── benchResources.js        # Scripts to populate mock candidate data
```

---

## Environment Variables

The application reads its configuration from a `.env` file located in the root of the backend directory. Copy `.env.example` to `.env` and configure accordingly:

| Key | Description | Example / Default Value |
| :--- | :--- | :--- |
| `PORT` | The port address the Express application listens to. | `5000` |
| `MONGODB_URI` | The connection URI to the MongoDB database server instance. | `mongodb://127.0.0.1:27017/vortex-cubes` |
| `JWT_SECRET` | Cryptographic secret used to sign and verify JSON Web Tokens. | *Provide a long, random secret phrase* |
| `JWT_EXPIRES_IN` | Token expiration duration format. | `7d` |
| `CLIENT_ORIGIN` | Whitelisted cross-origin origin (CORS) matching the frontend URL. | `http://localhost:5173` |

---

## Getting Started

### Prerequisites

- **Node.js** (v16.x or newer is recommended)
- **MongoDB** (Local daemon service running, or an active MongoDB Atlas cluster)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd VortexCubesWebsiteBackend
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Set up the local environment file:
   ```bash
   cp .env.example .env
   ```
   *Modify the variable fields inside the generated `.env` file according to your credentials.*

### Database Seeding

To clean the database and populate it with initial sample candidates (containing predefined roles, experience parameters, INR rate structures, and availability schedules), execute:
```bash
npm run seed
```

### Migration Scripts

The repository contains migration utilities located in `src/scripts` to modernize database states:
* **Rate Conversion**: Run `node src/scripts/migrateRates.js` to compute `monthlyRate` based on previous hourly metrics.
* **Currency Localizer**: Run `node src/scripts/migrateRatesToINR.js` to convert dollar-denominated prices into native rupee salary bands (e.g. `Rs. 50,000 – Rs. 75,000`).
* **Category Mapper**: Run `node src/scripts/migrateTechStacks.js` to standardize technology classifications (e.g., mapping MERN Stack elements to Full Stack definitions).

---

## Running the Application

### Development Mode (with Hot Reloading)
Launches the server through `nodemon` so modifications auto-trigger application reload.
```bash
npm run dev
```

### Production Mode
Launches the API server directly using standard Node.js execution.
```bash
npm start
```

---

## API Documentation

### Health Check

#### Check Server Health
* **Endpoint**: `GET /api/health`
* **Access**: Public
* **Success Response**: `200 OK`
  ```json
  {
    "status": "ok"
  }
  ```

---

### Authentication Routes

All request bodies must use JSON payload format.

#### Sign Up Admin User
* **Endpoint**: `POST /api/auth/signup`
* **Access**: Public
* **Request Payload**:
  ```json
  {
    "name": "Super Admin",
    "email": "admin@vortexcubes.com",
    "password": "strongPassword123"
  }
  ```
* **Success Response**: `201 Created`
  ```json
  {
    "token": "eyJhbGciOi...",
    "admin": {
      "id": "60a12e...",
      "name": "Super Admin",
      "email": "admin@vortexcubes.com",
      "role": "admin"
    }
  }
  ```

#### Login Admin User
* **Endpoint**: `POST /api/auth/login`
* **Access**: Public
* **Request Payload**:
  ```json
  {
    "email": "admin@vortexcubes.com",
    "password": "strongPassword123"
  }
  ```
* **Success Response**: `200 OK`
  *(Returns token and admin information identical to signup response)*

---

### Bench Resource Routes

#### Fetch Public Resources
Retrieves active candidates sorted by `sortOrder` index ascending.
* **Endpoint**: `GET /api/bench-resources`
* **Access**: Public
* **Success Response**: `200 OK`
  ```json
  [
    {
      "_id": "60b13d...",
      "role": "Senior Backend Architect",
      "experience": 8,
      "techStack": ["Full Stack", "Project Manager"],
      "monthlyRate": "Rs. 80,000 – Rs. 1,20,000",
      "availability": "Immediate",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-06-05T10:00:00.000Z",
      "updatedAt": "2026-06-05T10:00:00.000Z"
    }
  ]
  ```

#### Fetch Admin Resources
Retrieves all candidates (active and inactive) sorted by `sortOrder` index ascending.
* **Endpoint**: `GET /api/admin/bench-resources`
* **Access**: Private (Requires Admin Auth Header)
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Success Response**: `200 OK`

#### Create Bench Resource
Appends a new bench resource to the registry. The server automatically increments `sortOrder` values of existing items with a sortOrder greater than or equal to the new resource's target.
* **Endpoint**: `POST /api/admin/bench-resources`
* **Access**: Private (Requires Admin Auth Header)
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Request Payload**:
  ```json
  {
    "role": "UI/UX Designer",
    "experience": 4,
    "techStack": ["UI/UX", "Figma"],
    "monthlyRate": "Rs. 60,000 – Rs. 85,000",
    "availability": "Within 1 week",
    "isActive": true,
    "sortOrder": 2
  }
  ```
* **Success Response**: `201 Created`

#### Update Bench Resource
Updates resource parameters. If `sortOrder` shifts, the server automatically re-sequences the sort orders of all intermediate resources.
* **Endpoint**: `PUT /api/admin/bench-resources/:id`
* **Access**: Private (Requires Admin Auth Header)
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Request Payload**: *(Provide updated candidate fields)*
* **Success Response**: `200 OK`

#### Delete Bench Resource
Deletes the specific candidate. The server automatically shifts all subsequent resources up by decrementing their `sortOrder` to close the gap.
* **Endpoint**: `DELETE /api/admin/bench-resources/:id`
* **Access**: Private (Requires Admin Auth Header)
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Success Response**: `200 OK`
  ```json
  {
    "message": "Bench resource deleted."
  }
  ```

---

## Database Models

### AdminUser
Used to represent administrative accounts capable of managing bench data.

```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' }
}
```

### BenchResource
Used to represent professional candidates on the bench.

```javascript
{
  role: { type: String, required: true, trim: true },
  experience: { type: Number, required: true, min: 0 },
  techStack: { 
    type: [String], 
    required: true,
    validate: {
      validator: (items) => Array.isArray(items) && items.length > 0,
      message: 'At least one technology is required.'
    }
  },
  monthlyRate: { type: String, required: true, trim: true },
  availability: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}
```

---

## Middleware Implementation

- **`requireAdmin`** ([src/middleware/authMiddleware.js](file:///c:/Vortex/ebsite/VortexCubesWebsiteBackend/src/middleware/authMiddleware.js)):
  Intercepts incoming admin routes. Extracts the JSON Web Token from the `Authorization: Bearer <token>` header, decodes and verifies token signatures against `JWT_SECRET`, checks admin record existence in MongoDB, and exposes database models under `req.admin`.
- **`notFound`** ([src/middleware/errorMiddleware.js](file:///c:/Vortex/ebsite/VortexCubesWebsiteBackend/src/middleware/errorMiddleware.js)):
  Handles unmatched routes, responding with standard a `404 Not Found` response with a custom resource message.
- **`errorHandler`** ([src/middleware/errorMiddleware.js](file:///c:/Vortex/ebsite/VortexCubesWebsiteBackend/src/middleware/errorMiddleware.js)):
  Catches unexpected exceptions thrown down the routing chain, sanitizing and mapping them to structured `500 Server Error` response packages.

---

## Troubleshooting

1. **MongoDB Connection Failures**:
   - Verify that your MongoDB instance is running locally (`mongod`) or that your network allows egress to the server address specified inside the `MONGODB_URI` string in `.env`.
2. **CORS Rejection Errors**:
   - Ensure the `CLIENT_ORIGIN` variable matches the exact URL of your client web client interface, including port configuration (e.g. `http://localhost:5173`).
3. **Invalid/Expired Tokens**:
   - Double check that your token headers are formatted as `Authorization: Bearer <TOKEN>`. Ensure `JWT_SECRET` variables match exactly between client initialization setups and that the duration key `JWT_EXPIRES_IN` has not lapsed.
