# CSA API Documentation

This API powers the Course Selling App (CSA). It supports user and admin authentication, course management, and purchasing. Use this guide to integrate the backend with your frontend.

---

## Base URL

```
http://localhost:3000/
```

---

## Authentication

- **JWT tokens** are returned on successful signin.
- Pass tokens in the `Authorization` header as:  
  `Authorization: Bearer <token>`

---

## Endpoints

### User

#### `POST /user/signup`

- **Body:** `{ email, password, firstname, lastname }`
- **Response:** `{ message }`

#### `POST /user/signin`

- **Body:** `{ email, password }`
- **Response:** `{ token }`

#### `GET /user/purchases`

- **Headers:** `Authorization: Bearer <user-token>`
- **Response:** `{ courses: [ ... ] }`

---

### Admin

#### `POST /admin/signup`

- **Body:** `{ email, password, firstname, lastname }`
- **Response:** `{ message }`

#### `POST /admin/signin`

- **Body:** `{ email, password }`
- **Response:** `{ token }`

#### `POST /admin/course`

- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:** `{ title, desc, price, imageURL }`
- **Response:** `{ message }`

#### `PUT /admin/course`

- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:** `{ courseId, title, desc, price, imageURL }`
- **Response:** `{ message, course }`

#### `GET /admin/course/bulk`

- **Headers:** `Authorization: Bearer <admin-token>`
- **Response:** `[ ...courses ]`

---

### Courses

#### `GET /course/preview`

- **Response:** `[ ...courses ]`

#### `POST /course/purchase`

- **Headers:** `Authorization: Bearer <user-token>`
- **Body:** `{ courseId }`
- **Response:** `{ message }`

---

## Data Models

### User/Admin

```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string"
}
```

### Course

```json
{
  "title": "string",
  "desc": "string",
  "price": "number",
  "imageURL": "string",
  "creatorId": "adminId"
}
```

### Purchase

```json
{
  "userId": "userId",
  "courseId": "courseId"
}
```

---

## Error Handling

- All errors return `{ message, error? }` with appropriate HTTP status codes.

---

## Environment Variables

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET_ADMIN`
- `JWT_SECRET_USER`

---

## Notes

- All endpoints expect and return JSON.
- Use correct JWT for user/admin routes.
- For questions, contact the backend team.

---
