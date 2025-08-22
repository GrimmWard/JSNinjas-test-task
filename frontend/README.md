# Superheroes App (React + Vite + Express + MongoDB)

This project is a simple CRUD app for managing superheroes with photo uploads.
- Frontend: React + Vite
- Backend: Node.js + Express + Mongoose
- File uploads: handled by Multer and stored locally in the backend `uploads` folder


## Prerequisites
- Node.js 18+ and npm
- A MongoDB database (local or MongoDB Atlas)


## Quick Start
Run the backend and frontend in two separate terminals.

1) Backend
- Open a terminal in `project/backend`
- Install deps: `npm install`
- Create a `.env` file in `project/backend` with:
  - `PORT=3000`
  - `DATABASE_URL=<your_mongodb_connection_string>`
- Ensure the folder `project/backend/uploads` exists. If it doesn't, create it manually.
- Start the server: `npm run dev`
- By default, the API will be available at `http://localhost:3000` and static files at `http://localhost:3000/uploads/...`

2) Frontend
- Open another terminal in `project/frontend`
- Install deps: `npm install`
- Create a `.env` file in `project/frontend` with:
  - `VITE_API_URL=http://localhost:3000`
- Start the dev server: `npm run dev`
- Open the app in your browser at `http://localhost:5173`


## Environment Files
This project uses separate `.env` files for backend and frontend.

- Backend (`project/backend/.env`):
  - `PORT` — the port Express listens on (example: `3000`).
  - `DATABASE_URL` — MongoDB connection string (e.g., `mongodb://localhost:27017/superheroes` or your MongoDB Atlas URI).

- Frontend (`project/frontend/.env`):
  - `VITE_API_URL` — base URL of the backend API (example for local dev: `http://localhost:3000`). The frontend uses this to build API calls and image URLs.


## Photos: Where and How They Are Stored
- When creating or editing a superhero, images are uploaded via the backend using Multer.
- Files are stored on disk under `project/backend/uploads`.
- The backend serves this folder statically at `/uploads`:
  - Example public URL: `http://localhost:3000/uploads/<filename>`
- The database stores the relative file paths (e.g., `uploads/123456789.jpg`).
- The frontend composes image URLs like: `${VITE_API_URL}/${stored_path}`.
- On hero update/delete, the backend removes images that are no longer referenced.
- The `uploads` directory is ignored by git (see `backend/.gitignore`).

Notes:
- Keep `uploads` writable by the server process.
- If `uploads` is missing, create it before uploading images.


## Useful Scripts
Backend (from `project/backend`):
- `npm run dev` — start Express with nodemon.

Frontend (from `project/frontend`):
- `npm run dev` — start Vite dev server (http://localhost:5173).
- `npm run build` — build production assets.
- `npm run preview` — preview the production build.


## Troubleshooting
- CORS/Network errors: ensure `VITE_API_URL` matches the backend URL and the backend CORS allows `http://localhost:5173`.
- MongoDB connection errors: verify `DATABASE_URL` is correct and the database is reachable.
- Images not visible: confirm the image path in the DB looks like `uploads/filename.ext` and that the URL resolves to `http://localhost:3000/uploads/filename.ext`.
