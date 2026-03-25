## Spotify Backend API

Node.js + Express backend for a simple Spotify-like music service. It provides:

- User registration, login, and logout with JWT cookies
- Admin-only music upload and album creation
- Authenticated user access to songs and albums
- Music file storage via ImageKit

---

## Tech Stack

- Node.js, Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT) for auth
- ImageKit for file storage

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd spotify
npm install
```

### 2. Create `.env` file

In the project root (same folder as `server.js`), create a `.env` file with the following variables:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-random-secret-string>
IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-api-key>
```

Explanation of each variable:

- `MONGO_URI` – MongoDB connection string used by Mongoose to connect to your database.
- `JWT_SECRET` – Secret key used to sign JWT tokens for authentication. Use a long, random string and **never** commit it to Git.
- `IMAGEKIT_PRIVATE_KEY` – Private API key from your ImageKit dashboard, used by the backend to upload music files.

> Important: Do **not** put real secrets in a public repo. Add `.env` to your `.gitignore` so it never gets committed.

### 3. Run the server

```bash
npm start 
or
npx nodemon server.js
```

By default the API runs on `http://localhost:3000`.

---

## API Overview

### Auth Routes (`/api/auth`)

- `POST /api/auth/register` – Register a new user.
	- Body: `{ "username", "email", "password", "role"? }`
- `POST /api/auth/login` – Login with username or email.
	- Body: `{ "username"? , "email"?, "password" }`
- `POST /api/auth/logout` – Clear auth cookie and logout.

### Music Routes (`/api/music`)

- `POST /api/music/upload` – Admin: upload a single song.
	- Auth: admin cookie (JWT)
	- Form-data: `music` (file), `title` (string)
- `POST /api/music/album-upload` – Admin: create an album from song IDs.
	- Body: `{ "title", "songIds": ["..."] }`
- `GET /api/music` – User: get list of songs (limited to 20).
- `GET /api/music/albums` – User: get list of albums (basic info).
- `GET /api/music/albums/:id` – User: get a single album with populated artist info.

---

## Environment Setup Summary

1. Create `.env` in the root directory.
2. Add these three variables:
	 - `MONGO_URI`
	 - `JWT_SECRET`
	 - `IMAGEKIT_PRIVATE_KEY`
3. Keep `.env` out of version control.
4. Restart the server after changing env values.

