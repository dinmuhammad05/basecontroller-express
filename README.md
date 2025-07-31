# 🧩 BaseController Express

`BaseController-Express` is a reusable, extensible base controller for building RESTful APIs with [Express.js](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/). It provides common CRUD operations, centralized error handling, and standard JSON response formatting out of the box.

## ✨ Features

- ✅ Reusable `BaseController` class with CRUD methods
- ✅ Built-in ID validation using `mongoose.isValidObjectId()`
- ✅ Centralized error handling with `AppError` and `globalErrorHandle`
- ✅ Consistent success response formatting
- ✅ Simple to extend and use in real-world projects

---

## 📆 Installation

```bash
npm install basecontroller-express
```

---

## 📁 Folder Structure

```
basecontroller-express/
├── controllers/
│   └── BaseController.js
├── error/
│   ├── AppError.js
│   └── global-error-handel.js
├── utils/
│   └── success-res.js
└── main.js (exports all core parts)
```

---

## 🚀 Usage

### 1. Create Your Controller

```js
// UserController.js
import { BaseController } from "basecontroller-express";
import UserModel from "../models/User.js";

export class UserController extends BaseController {
  constructor() {
    super(UserModel);
  }
}
```

---

### 2. Create Routes

```js
// user.routes.js
import express from "express";
import { UserController } from "../controllers/UserController.js";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
```

---

### 3. Apply Global Middleware

```js
// app.js
import express from "express";
import userRoutes from "./routes/user.routes.js";
import { globalErrorHandle } from "basecontroller-express";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

// Global error handler
app.use(globalErrorHandle);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 📜 API Reference

### `BaseController(model)`

| Method    | Description                         |
| --------- | ----------------------------------- |
| `create`  | `POST /` - Create a new document    |
| `getAll`  | `GET /` - Get all documents         |
| `getById` | `GET /:id` - Get one document by ID |
| `update`  | `PUT /:id` - Update a document      |
| `delete`  | `DELETE /:id` - Delete a document   |

---

### `AppError(message, statusCode)`

Use this to throw custom errors:

```js
throw new AppError("User not found", 404);
```

---

### `globalErrorHandle(err, req, res, next)`

Global middleware that catches all errors thrown in the app and returns a consistent error response.

---

### `successRes(res, data, statusCode)`

Use this helper to send successful responses:

```js
return successRes(res, createdUser, 201);
```

---

## 📄 License

MIT

---

## ✍️ Author

Made with ❤️ by [(https://github.com/dinmuhammad05)]

