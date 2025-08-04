# LinkedIn Community Clone

A full-stack MERN application inspired by LinkedIn, allowing users to register, log in, create posts, view profiles, and edit their information. Built with React, Node.js, Express, and MongoDB.

---

## Features

- User authentication (register & login)
- Create, edit, and delete posts
- View your own and other users' profiles
- Responsive UI with Tailwind CSS
- Protected routes for authenticated users

---

## Project Structure

```
linkedin_community/
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
git clone https://github.com/your-username/linkedin_community.git
cd linkedin_community
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
- Create new posts and view the feed.
- Edit your profile and view other users' profiles.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Authentication:** JWT-based, protected routes

---

## License

This project is licensed under the MIT