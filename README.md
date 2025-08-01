# 🧩 BaseController Express

`BaseController-Express` is a reusable, extensible base controller for building RESTful APIs with [Express.js](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/). It provides common CRUD operations, centralized error handling, and standard JSON response formatting out of the box.

## ✨ Features

- ✅ Reusable `BaseController` class with CRUD methods
- ✅ Built-in ID validation using `mongoose.isValidObjectId()`
- ✅ Centralized error handling with `AppError` and `globalErrorHandle`
- ✅ Consistent success response formatting
- ✅ Optional `.populate()` support for relational data
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
    super(UserModel, ["profile"]); // Optional populate fields
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
## 📦 main.js - Entry point

You can import everything from a single entry point using `main.js`:

```js
// main.js
export { BaseController } from "./controllers/BaseController.js";
export { AppError } from "./error/AppError.js";
export { globalErrorHandle } from "./error/global-error-handel.js";
export { successRes } from "./utils/success-res.js";
```

Then in your application:

```js
// app.js
import express from "express";
import { globalErrorHandle } from "basecontroller-express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

// ✅ Global error handler middleware — keep this last
app.use(globalErrorHandle);
```

---

## 📜 API Reference

### `BaseController(model, [populateFields])`

| Method    | Description                         |
| --------- | ----------------------------------- |
| `create`  | `POST /` - Create a new document    |
| `getAll`  | `GET /` - Get all documents         |
| `getById` | `GET /:id` - Get one document by ID |
| `update`  | `PUT /:id` - Update a document      |
| `delete`  | `DELETE /:id` - Delete a document   |

> You can pass an array of populate fields to the controller:
>
> ```js
> super(UserModel, ["profile", "group"])
> ```
>
> These fields will be auto-populated in `getAll` and `getById` methods.

---

### 🔄 Populate Support

If your model includes references to other collections (e.g., a user has a `profile`), use the optional `populateFields` array to automatically populate them.

#### ✅ Example

```js
// UserController.js
import { BaseController } from "basecontroller-express";
import UserModel from "../models/User.js";

export class UserController extends BaseController {
  constructor() {
    super(UserModel, ["profile", "group"]);
  }
}
```

#### 🔎 Result

- `GET /api/users` – populates `profile` and `group` for each user
- `GET /api/users/:id` – populates `profile` and `group` for single user

Populate only affects `getAll` and `getById`.

Make sure your schema has `ref` set up like so:

```js
const userSchema = new Schema({
  name: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});
```

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

Made with ❤️ by [Qosimov Dinmuhammad](https://github.com/dinmuhammad05)
---

# 🧩 BaseController Express - O‘zbekcha

`BaseController-Express` — bu [Express.js](https://expressjs.com/) va [Mongoose](https://mongoosejs.com/) yordamida RESTful API yaratish uchun qayta ishlatiladigan va kengaytiriladigan baza controller hisoblanadi. U umumiy CRUD funksiyalarini, markazlashtirilgan xatoliklarni qayta ishlashni va yagona JSON formatda javob yuborishni ta'minlaydi.

## ✨ Xususiyatlari

- ✅ CRUD metodlarga ega qayta ishlatiladigan `BaseController` klass
- ✅ `mongoose.isValidObjectId()` orqali ID'ni tekshirish
- ✅ `AppError` va `globalErrorHandle` yordamida xatoliklarni markazlashtirib ushlash
- ✅ Standart muvaffaqiyatli javob formatlash
- ✅ `.populate()` orqali bog‘langan ma'lumotlarni avtomatik chaqirish
- ✅ Haqiqiy loyihalarda ishlatishga tayyor

---

## 🚀 Qanday ishlatish

### 1. Controller yaratish

```js
import { BaseController } from "basecontroller-express";
import UserModel from "../models/User.js";

export class UserController extends BaseController {
  constructor() {
    super(UserModel, ["profile"]); // Ixtiyoriy populate maydonlari
  }
}
```

---

### 🔄 `populate` haqida

Agar sizning modelingizda boshqa kolleksiyalarga `ref` berilgan bo‘lsa, `populateFields` massivi yordamida `getAll` va `getById` metodlarida `.populate()` avtomatik qo‘llaniladi.

```js
super(UserModel, ["profile", "group"]);
```

Bu `GET /api/users` va `GET /api/users/:id` chaqiruvlarida `profile` va `group` field'larini avtomatik to‘ldiradi.

Schema misoli:

```js
const userSchema = new Schema({
  name: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});
```

---

### 2. Xatoliklar bilan ishlash

```js
throw new AppError("Foydalanuvchi topilmadi", 404);
```

Yoki global error handler orqali:

```js
app.use(globalErrorHandle);
```

---

### 3. Muvaffaqiyatli javob yuborish

```js
return successRes(res, user, 201);
```
---

# 4 📦 main.js - Kirish nuqtasi-

`main.js` fayli yordamida barcha funksiyalarni bitta joydan import qilishingiz mumkin:

```js
// main.js
export { BaseController } from "./controllers/BaseController.js";
export { AppError } from "./error/AppError.js";
export { globalErrorHandle } from "./error/global-error-handel.js";
export { successRes } from "./utils/success-res.js";
```

So'ng uni ilovada quyidagicha ishlatishingiz mumkin:

```js
// app.js
import express from "express";
import { globalErrorHandle } from "basecontroller-express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

// ✅ Xatoliklarni ushlovchi middleware — oxirida yozilishi kerak
app.use(globalErrorHandle);
```

---

## 📄 Litsenziya

MIT

---

## ✍️ Muallif

Muhabbat bilan tayyorladi — [Qosimov Dinmuhammad](https://github.com/dinmuhammad05)
