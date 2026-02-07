# Cloud Task Management App

A simple task management web app (in development) that provides user authentication and task CRUD operations. The project is a full-stack Vue + Node.js application with a Postgres database. It is intended to be deployed on Google Cloud where the database will be hosted in Cloud SQL (Postgres) and other data may be stored in Google Cloud Storage as needed.

This README is a short summary for interviewers and contributors so they can quickly understand the goals, current state, and how to run the project locally for evaluation.

## High level summary
- Purpose: Let authenticated users create, view, update and delete tasks. Each task contains title, description, priority, status, assignee, and timestamps.
- Intended platform: Web (single-page app frontend using Vue 3 + Vite, backend using Express.js and node-postgres).
- Hosting & cloud plan: The production database will be hosted on Google Cloud (Cloud SQL for Postgres). Static assets and file uploads (if added) will be stored in Google Cloud Storage.

## Current status
- Actively under development. Core components are scaffolded for both frontend and backend.
- Implemented so far (work-in-progress):
  - Frontend: Vue 3 components for login/register, task list, task form, and overlays. Vite configured with path aliasing.
  - Backend: Express routes for authentication and tasks; Postgres migrations for `users` and `tasks` tables; password hashing with bcrypt; signup and login implemented and wired to Postgres via a shared connection pool.
- TODO / next steps: polish UI, finish task controller CRUD logic, integrate production-ready authentication/session handling, and complete Google Cloud deployment/migrations.

## Tech stack
- Frontend: Vue 3, Vite, Tailwind-style utility classes (for quick styling)
- Backend: Node.js, Express.js, node-postgres (`pg`), bcrypt for password hashing, jsonwebtoken for authentication
- Database: PostgreSQL (local during development; will move to Cloud SQL on Google Cloud)

## Project structure (top level)
- `frontend/` — Vue app, routes and components
- `backend/` — Express server, controllers, routes, DB migrations and helpers
- `backend/db/migrations/` — SQL migration that creates `users` and `tasks` tables

## Quick local setup (developer steps)
1. Ensure Postgres is running locally and a database exists (example uses `task_db`).
2. Run migrations to create tables: `psql -U postgres -d task_db -f backend/db/migrations/001_init_tables.sql`
3. Install dependencies and start backend
   - Backend: `cd backend && npm install && node server.js` (or use `nodemon` for development)
4. Start frontend
   - Frontend: `cd frontend && npm install && npm run dev`

Note: Environment variables are read from `.env` (DB connection, JWT secret, bcrypt rounds, etc.). See `backend/db/index.js` and `backend/controllers/userController.js` for default fallbacks.

## API (examples)
- POST `/api/auth/signup` — create a new user. JSON body: `{ "name": "Test", "email": "x@example.com", "password": "secret" }`.
- POST `/api/auth/login` — login and receive a JWT. JSON body: `{ "email": "x@example.com", "password": "secret" }`.
- Task routes are available under `/api/auth/*` (see `backend/routes/taskRoutes.js`) for create/read/update/delete operations.

## Google Cloud plan
- Database: migrate from local Postgres to Google Cloud SQL (Postgres). We'll update the backend to connect via a secure Cloud SQL connection and use environment variables (or Secret Manager) for credentials.
- Storage: any file uploads or exported data will be stored in Google Cloud Storage buckets.
- Deployment: consider Cloud Run (serverless containers) or App Engine for the backend and a static hosting option (Cloud Storage + CDN) or Cloud Run for the frontend build.

## Notes for interviewers
- This repo demonstrates the end-to-end approach and design decisions: a component-driven Vue frontend, an Express backend with SQL persistence, secure password hashing, and an eye toward cloud deployment on Google Cloud.
- The application is actively being built; expect incomplete controllers, UI polish, and further integration work (e.g., automated migrations, CI/CD, production config).

If you'd like, I can add a short architecture diagram, a Postman collection, or a step-by-step deployment checklist for Google Cloud.
