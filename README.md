# 🚀 QuickHire — Backend API

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
- npm
- MongoDB (local or MongoDB Atlas)

---

### 📦 Installation

```bash
# Clone repository
git clone <repo-url>

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
ADMIN_SECRET=quickhire_admin
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

## ❤️ Health Check

```
GET /
```

Response:

```json
{
  "success": true,
  "message": "🚀 QuickHire API is up and running!"
}
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

---

# 📖 API Endpoints

---

## 🔑 Authentication

### Register Admin

```
POST /auth/register
```

**Body:**

```json
{
  "email": "admin@quickhire.com",
  "password": "admin123",
  "adminSecret": "quickhire_admin"
}
```

---

### Login Admin

```
POST /auth/login
```

**Body:**

```json
{
  "email": "admin@quickhire.com",
  "password": "admin123"
}
```

Returns JWT token.

Use token:

```
Authorization: Bearer <token>
```

---

## 💼 Jobs

### Get All Jobs

```
GET /jobs
```

Supports:

- search
- category filter
- location filter
- job type filter
- pagination

Example:

```
/jobs?search=react&page=1&limit=10
```

---

### Get Single Job

```
GET /jobs/:id
```

---

### Get Job Categories

```
GET /jobs/categories
```

---

### Create Job (Admin)

```
POST /jobs
```

---

### Update Job (Admin)

```
PATCH /jobs/:id
```

---

### Delete Job (Admin)

```
DELETE /jobs/:id
```

---

## 📄 Applications

### Submit Application (Public)

```
POST /applications
```

**Body:**

```json
{
  "jobId": "job_id",
  "name": "Applicant Name",
  "email": "user@email.com",
  "resumeLink": "https://example.com/resume"
}
```

---

### Get All Applications (Admin)

```
GET /applications
```

---

### Get Single Application (Admin)

```
GET /applications/:id
```

---

### Update Application Status (Admin)

```
PATCH /applications/:id/status
```

Status values:

```
pending | reviewed | accepted | rejected
```

---

### Delete Application (Admin)

```
DELETE /applications/:id
```

---

# 🧱 Data Models

---

## Job Model

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

---

## Application Model

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

---

## Admin Model

```ts
{
  email: string;
  password: string;
  role: "admin";
}
```

---

# 🔒 Security

- bcrypt password hashing
- JWT authentication
- Role-based authorization
- Rate limiting
- Request validation
- Duplicate application prevention
- CORS protection

---

# ⚠️ Error Handling

Centralized error handler provides:

- Validation errors
- Authentication errors
- Not found errors
- Server errors

---

# 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build project
npm start        # Run production server
npm run seed     # Seed sample data
```
