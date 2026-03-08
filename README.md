# QuickHire — Job Board Platform

RESTful API server for the **QuickHire job board platform**, built with **Node.js**, **Express**, **TypeScript** and **MongoDB (Mongoose)**.

---

## 📌 Features

- Public job listings with search and filtering
- Job application submission and management
- JWT-based admin authentication
- Role-based access control
- MongoDB data persistence
- Rate limiting and input validation
- Centralized error handling

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Password Hashing:** bcryptjs
- **Validation:** Zod
- **Rate Limiting:** express-rate-limit

---

## 📂 Project Structure

```
quickhire-server/
├── src/
│   ├── config/          # Environment and database configuration
│   ├── middlewares/     # Auth, validation, rate limit, error handling
│   ├── models/          # Mongoose schemas
│   ├── modules/         # Feature modules (auth, jobs, applications)
│   ├── routes/          # Route aggregation
│   ├── types/           # Custom TypeScript types
│   ├── utils/           # Helper utilities
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server bootstrap
│
├── .env.example
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)

---

### 📦 Installation

```bash
# Clone repository
git clone https://github.com/Sabbir2809/quickhire-server.git

# Navigate to project
cd quickhire-server

# Install dependencies
npm install
```

---

### 🔐 Environment Variables

Create environment file:

```bash
cp .env.example .env
```

Example variables:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/quickhire
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
ADMIN_SECRET=your_admin_secret
```

---

### ▶️ Running the Server

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🌐 Base API URL

```
http://localhost:5000/api/v1
```

---

## 📦 Response Format

All API responses follow:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

## ⚠️ Error Handling

The API uses a centralized error handling system with consistent error responses:

- Validation errors
- Authentication errors
- Not found errors
- Server errors

```ts
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "error": {
    "details": "Additional error details"
  }
}
```

---

## 🔑 API Endpoints

### 1. Auth

| Method | Endpoint                | Description    |
| ------ | ----------------------- | -------------- |
| POST   | `/api/v1/auth/register` | Register admin |
| POST   | `/api/v1/auth/login`    | Admin login    |

### 2. Jobs

| Method | Endpoint                  | Auth     | Description     |
| ------ | ------------------------- | -------- | --------------- |
| GET    | `/api/v1/jobs`            | ❌       | List all jobs   |
| GET    | `/api/v1/jobs/:id`        | ❌       | Get job details |
| GET    | `/api/v1/jobs/categories` | ❌       | Get categories  |
| POST   | `/api/v1/jobs`            | ✅ Admin | Create job      |
| PATCH  | `/api/v1/jobs/:id`        | ✅ Admin | Update job      |
| DELETE | `/api/v1/jobs/:id`        | ✅ Admin | Delete job      |

#### Query Parameters (GET /api/v1/jobs)

- `search` — Full-text search
- `category` — Filter by category
- `location` — Filter by location
- `type` — Filter by job type
- `featured` — Show featured only (`true`)
- `page` — Page number (default: 1)
- `limit` — Results per page (default: 10)

### 3. Applications

| Method | Endpoint                          | Auth     | Description        |
| ------ | --------------------------------- | -------- | ------------------ |
| POST   | `/api/v1/applications`            | ❌       | Submit application |
| GET    | `/api/v1/applications`            | ✅ Admin | List applications  |
| GET    | `/api/v1/applications/:id`        | ✅ Admin | Get application    |
| PATCH  | `/api/v1/applications/:id/status` | ✅ Admin | Update status      |
| DELETE | `/api/v1/applications/:id`        | ✅ Admin | Delete application |

---

## 📦 Mongoose Data Models

### 1. Job Schema

```ts
{
  title: string
  company: string
  location: string
  category: string
  type: string
  description: string
  requirements?: string[]
  salary?: string
  tags?: string[]
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}
```

### 2. Application Schema

```ts
{
  jobId: ObjectId
  name: string
  email: string
  resumeLink: string
  coverNote?: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
}
```

### 3. Admin Schema

```ts
{
  email: string;
  password: string;
  role: "admin";
}
```

---

## 🔒 Security

- bcrypt password hashing
- JWT authentication
- Role-based authorization
- Rate limiting
- Request validation
- Duplicate application prevention
- CORS protection

---

# 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build project
npm start        # Run production server
npm run seed     # Seed sample data
```
