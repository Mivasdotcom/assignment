# 📺 Node.js Streaming API

This is a Node.js backend service built with **Express**, **Prisma**, and **JWT authentication**.  
It provides user authentication and streaming content management features.

---

## 🚀 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [Postman](https://www.postman.com/) (for API testing)
- [Git](https://git-scm.com/)
- A running **PostgreSQL** database

---

## ⚙️ Setup

### Clone the repository
```bash
git clone git@github.com-Mivasdotcom/assignment.git
cd assignment
```

### Install dependencies 
```bash 
npm install
```

### Create .env file in the root directory 
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"

JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"
PORT=3000
```

### Setup Prisma 
```bash 
npx prisma migrate dev --name init
npx prisma generate

# Inspect the database
npx prisma studio
```

### Running the server 
```bash
npm run dev
```

### Running Tests
```bash
npm test
```


### Create Admin user using seed script
```bash
node prisma/seed.js
# You should see the following 

Admin user created: admin@example.com

```


### API Documentation 

The API documentation is managed through Postman.
You can import the provided collection (Node Js.postman_collection.json) into Postman.
It includes all requests for:

User registration and login

Streaming object CRUD operations

Example payloads and responses