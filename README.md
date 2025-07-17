## 🛠️ Tech Stack

* **Node.js** + **Express** (API & Middleware)
* **MongoDB** + **Mongoose** (Database & ODM)
* **JWT** (Authentication)
* **Multer** (File Upload)
* **bcrypt, moment, dotenv, cors** (Utilities & Middleware)
* **Nodemon** (Dev server)

---

## 🚀 Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/piratecoderz/piratecoderz-lms-ue-backend.git
   cd piratecoderz-lms-ue-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**

   * Copy `.env.example` to `.env`
   * Set your MongoDB URI:

     ```
     DB_URI=YOUR_MONGODB_CONNECTION_STRING
     ```

4. **Run the Server**

   ```bash
   npm start
   ```

   Or for development with auto-reload:

   ```bash
   npm run dev
   ```

   The server runs by default on [http://localhost:5000/](http://localhost:5000/)

---

## 🗝️ Environment Variables

```env
DB_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

## 📡 API Overview

All endpoints are prefixed with `/api/`.

| Entity        | Route Prefix        | Description                    |
| ------------- | ------------------- | ------------------------------ |
| Students      | `/api/students`     | Student management             |
| Teachers      | `/api/teacher`      | Teacher management             |
| Assignments   | `/api/assignment`   | Assignment upload & submission |
| Quizzes       | `/api/quiz`         | Quiz creation & attempt        |
| Materials     | `/api/material`     | Course material management     |
| Merit Lists   | `/api/meritList`    | Merit list management          |
| Fee Structure | `/api/feeStructure` | Fee structure management       |
| Departments   | `/api/department`   | Department management          |
| Time Table    | `/api/timeTable`    | Timetable management           |
| Attendance    | `/api/`             | Attendance tracking            |
| User Auth     | `/api/user`         | Registration/Login/Auth        |

**Static File Access:**

* Assignments: `/assignments/`
* Materials: `/materials/`

---

## 🧭 Controller Methods

Each controller manages business logic for its route.
Here are some of the key exported methods for reference:

**Assignment Controller:**

* `createAssignment`
* `submitAssignment`
* `markAssignment`
* `getAssignments`
* `getAssignmentsByCourseName`
* `getAssignmentById`
* `deleteAssignmentById`
* `updateAssignmentById`

**Other controllers** offer similar CRUD and business methods (like for students, teachers, departments, etc).

---

## 🤝 Contributing

Pull requests are welcome!
Open an issue for any feature requests or bugs.

---

## 📃 License

For client/academic use. For commercial use or customization, contact [Pirate Coderz](https://github.com/piratecoderz).

---

> Built with ❤️ by **Pirate Coderz**

```
