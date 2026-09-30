# Solitude

A secure REST API for personal journaling.

## Features

- 🔐 User authentication with JWT
- 📝 Journal entry CRUD operations
- 🔎 Search journal entries
- 📄 Pagination
- 🛡️ Protected routes and ownership-based access

## Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB** — Database
- **Mongoose** — ODM
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **Jest** — Testing
- **Supertest** — API testing
- **MongoDB Memory Server** — In-memory database for tests
- **Helmet** — Security headers
- **express-rate-limit** — Rate limiting
- **Render** — Deployment

## Project Structure

```text
solitude-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── entriesController.js
│   │   └── usersController.js
│   ├── middleware/
│   │   ├── appError.js
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validateEntry.js
│   │   └── validateUser.js
│   ├── models/
│   │   ├── entry.js
│   │   └── users.js
│   ├── routes/
│   │   ├── entries.js
│   │   └── user.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── password.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── app.test.js
│   └── setup.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user` | Register a new user | No |
| POST | `/user/login` | Log in a user | No |
| GET | `/user/me` | Get current user | Yes |
| PATCH | `/user/me` | Update current user | Yes |
| PATCH | `/user/me/password` | Change password | Yes |
| GET | `/entries` | Get user's journal entries | Yes |
| POST | `/entries` | Create a journal entry | Yes |
| GET | `/entries/:id` | Get a specific entry | Yes |
| PATCH | `/entries/:id` | Update a journal entry | Yes |
| DELETE | `/entries/:id` | Delete a journal entry | Yes |

## Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes using authentication middleware
- User ownership checks for journal entries
- Password-change token invalidation
- Input validation and error handling
- Helmet security headers
- Login rate limiting
- JSON request body size limit
- Query parameter validation
- Protection against mass assignment

## Testing

Solitude uses Jest, Supertest, and MongoDB Memory Server for automated API testing.

- 38 automated tests
- Authentication and authorization tests
- User registration and login tests
- Journal entry CRUD tests
- Input validation tests
- Error-handling tests
- Ownership and protected-field tests
- Rate-limiting tests
- Request-size and query-limit tests

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/sandhyacs-d/solitude-api.git
cd solitude-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the development server

```bash
npm run dev
```

The API will run locally on:

```text
http://localhost:3000
```

### 5. Run tests

```bash
npm test
```

## Live Deployment

Solitude is deployed using Render and connected to MongoDB Atlas.

**Live API:**
https://solitude-api-346p.onrender.com

The production API has been tested for:

- User registration
- User login and JWT authentication
- Protected routes
- Journal entry creation
- MongoDB database operations

## Environment Variables

Create a `.env` file in the project root and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to Git. It contains sensitive credentials and is included in `.gitignore`.