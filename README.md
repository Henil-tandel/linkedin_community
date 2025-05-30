# Blog Editor App

A full-stack MERN blog editor application that allows users to register, log in, write, save drafts, and publish blog posts. Built with React, Node.js, Express, and MongoDB.

---

## Features

- User authentication (register & login)
- Create, edit, and delete blog posts
- Save drafts and publish blogs
- View all your blogs (drafts & published)
- Responsive UI with Tailwind CSS
- Protected routes for authenticated users

---

## Project Structure

```
blog-editor-app/
│
├── client/           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── ...
│
├── server/           # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or Atlas)

### 1. Clone the repository

```sh
git clone https://github.com/your-username/blog-editor-app.git
cd blog-editor-app
```

### 2. Setup the Backend

```sh
cd server
npm install
```

- Create a `.env` file in the `server/` directory:

  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:

  ```sh
  node index.js
  # or for development with auto-reload
  npx nodemon index.js
  ```

### 3. Setup the Frontend

```sh
cd ../client
npm install
```

- Start the React app:

  ```sh
  npm start
  ```

- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Usage

- Register a new account or log in.
- Create a new blog, save as draft, or publish.
- View, edit, and manage your blogs from the dashboard.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Authentication:** JWT-based, protected routes

---

## Scripts

### Backend

- `npm start` — Start the server
- `npx nodemon index.js` — Start server with auto-reload

### Frontend

- `npm start` — Start the React app
- `npm run build` — Build for production
- `npm test` — Run tests

---

## License

This project is licensed under the MIT License.