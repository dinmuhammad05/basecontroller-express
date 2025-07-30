# basecontroller-express

basecontroller-express
🧩 BaseController Class The BaseController is a reusable, generic controller class designed for Express.js applications using Mongoose. It provides a set of common CRUD operations (create, findAll, findById, update, and delete) that can be extended by any controller working with a Mongoose model. ✅ Usage To use the BaseController, simply extend it in your own controller class and pass the corresponding Mongoose model:

```js
import YourModel from "../models/your.model.js";
import { BaseController } from "./base.controller.js";
class YourController extends BaseController {
    constructor() {
        super(YourModel);
    }
}
```

⚙️ Methods All methods are asynchronous and return JSON responses with appropriate status codes and messages. create(req, res) Creates a new document in the database using the request body. Success: 201 Created Failure: 500 Internal Server Error findAll(\_, res) Retrieves all documents from the collection. Success: 200 OK Failure: 500 Internal Server Error findById(req, res) Finds a single document by its ID. Validates if the id is a valid MongoDB ObjectId. Success: 200 OK Failure:

400 Bad Request if the ID is invalid 404 Not Found if no document is found 500 Internal Server Error otherwise update(req, res) Updates a document by its ID using data from the request body. Validates if the id is a valid MongoDB ObjectId. Success: 200 OK Failure: 400 Bad Request for invalid ID 404 Not Found if the document doesn’t exist 500 Internal Server Error otherwise delete(req, res) Deletes a document by its ID. Validates if the id is a valid MongoDB ObjectId. Success: 200 OK Failure: 400 Bad Request for invalid ID 404 Not Found if the document doesn’t exist 500 Internal Server Error otherwise 📦 Dependencies mongoose – Used for model operations and ObjectId validation

💡 Tip You can further customize this controller by: Overriding methods in child classes Adding validation middlewares before controller methods Logging responses or errors using a logger like Winston

```

```
>>>>>>> dd54ec0 (Readme.md file to'g'rilandi)
