# Task Management System

A full-stack task management web application built with a modern tech stack.

## Tech Stack
* **Frontend:** Next.js (App Router), React, TypeScript, TailwindCSS
* **Backend:** Node.js, Express, TypeScript, Prisma ORM
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens) with Access/Refresh strategy and bcrypt hashing

## Features
* User Registration & Login
* Create, Read, Update, Delete (CRUD) tasks
* Mark tasks as pending/completed
* Search tasks by title
* Filter tasks by status
* Paginated task dashboard
* Responsive glassmorphism UI with toast notifications

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd task-management-system
```

### 2. Setup PostgreSQL
Install PostgreSQL and create a database named `taskmanager`.

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL="postgresql://postgres:YOUR_DB_PASSWORD@localhost:5432/taskmanager?schema=public"
ACCESS_TOKEN_SECRET="your-access-secret"
REFRESH_TOKEN_SECRET="your-refresh-secret"
PORT=5000
FRONTEND_URL="http://localhost:3001"
```

Push the database schema and start the server:
```bash
npx prisma db push
npx prisma generate
npm run dev
```

### 4. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:3001`!
# task-management
# task-management
