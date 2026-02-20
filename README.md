# 🚀 JWT Authentication & Refresh Token API

A Node.js + Express backend implementing **JWT authentication with refresh tokens**, PostgreSQL integration, and protected routes.

---

## 📌 Features

- 🔐 User Registration
- 🔑 Login with JWT Access Token
- 🔁 Refresh Token mechanism
- 🛡 Protected Dashboard Route
- 🗄 PostgreSQL Database
- 🌍 CORS Enabled
- 📦 Modular Route Structure

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- cors
- dotenv

---

## 📁 Project Structure

```
project-root/
│
├── db.js
├── server.js
├── .env
├── routes/
│   ├── jwtauth.js
│   └── dashboard.js
│
└── middleware/
    └── authorization.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sheikhahmadullah/saas-backend.git
cd saas_backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the root directory:

```
PORT=8000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

---

## ▶️ Running the Server

```bash
npm start
```

or (if using nodemon)

```bash
npm run dev
```

Server will run at:

```
http://localhost:8000
```

---

# 🔐 Authentication Flow

## 📝 Register

### Endpoint

```
POST /auth/register
```

### Body

```json
{
  "name": "test",
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## 🔑 Login

### Endpoint

```
POST /auth/login
```

### Response

```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

---

## 🔁 Refresh Token

### Endpoint

```
POST /auth/refresh-token
```

### Body

```json
{
  "refreshToken": "your_refresh_token"
}
```

### Response

```json
{
  "accessToken": "new_access_token"
}
```

---

## 🛡 Protected Route (Dashboard)

### Endpoint

```
GET /dashboard
```

### Header

```
Authorization: Bearer your_access_token
```

---

# 🔐 JWT Strategy

### Access Token

- Short-lived (e.g., 15 minutes)
- Used to access protected routes

### Refresh Token

- Long-lived (e.g., 7 days)
- Used to generate new access tokens
- Should be stored securely (HTTP-only cookies or database)

---

# 🗄 Database Setup (PostgreSQL)

Example `users` table:

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
);
```

---

# 🔒 Security Best Practices

- Hash passwords using bcrypt
- Store secrets in `.env`
- Use HTTPS in production
- Use HTTP-only cookies for refresh tokens
- Validate all user inputs
- Implement rate limiting

---

# 📌 Environment Variables

| Variable           | Description                  |
| ------------------ | ---------------------------- |
| PORT               | Server port                  |
| DATABASE_URL       | PostgreSQL connection string |
| JWT_SECRET         | Secret for access token      |
| JWT_REFRESH_SECRET | Secret for refresh token     |

---

# 🧪 Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

### Recommended Test Flow:

1. Register a user
2. Login to receive tokens
3. Access protected dashboard route
4. Use refresh token to generate new access token

---

# 📄 License

MIT License
