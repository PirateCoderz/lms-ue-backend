# 🎓 LMS Portal Backend – Pirate Coderz ⚓

Welcome to the backend repository of the **LMS UE Portal**, a university-level Learning Management System built for a client’s final year project.  
Crafted by **Pirate Coderz**, this system is designed with modularity, scalability, and real-world use in mind.

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Multer** for file uploads
- **JWT** for authentication
- **CORS** for secure API access
- **dotenv** for configuration

---

## 📂 Project Structure

```

piratecoderz-lms-ue-backend/
├── index.js                # Main entry point
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variable
├── .env.example            # Environment variable sample
├── README.md               # You're reading it!
│
├── controllers/            # All core business logic
│   ├── assignmentController.js
│   ├── attendenceController.js
│   ├── courseMaterialController.js
│   └── ...more
│
├── models/                 # Mongoose schemas
│   ├── assignments.js
│   ├── students.js
│   └── ...more
│
├── routes/                 # API routes
│   ├── assignmentRoutes.js
│   ├── studentRoutes.js
│   └── ...more
│
└── public/
├── assignments/        # Uploaded assignment files
└── materials/          # Uploaded study materials

````

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/piratecoderz/lms-ue-backend.git

# 2. Navigate to project
cd piratecoderz-lms-ue-backend

# 3. Install dependencies
npm install

# 4. Add your environment variables
cp .env.example .env

# 5. Run the project
npm run dev
````

> 🛠️ Make sure you have MongoDB running locally or use a cloud URI (MongoDB Atlas) in your `.env`.

---

## 🔐 Environment Variables

Here's what your `.env` file should contain:

```env
DB_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```

---

## 🔌 Available API Routes

> All APIs are prefixed with `/api`

| Module          | Routes          | Description                         |
| --------------- | --------------- | ----------------------------------- |
| Students        | `/students`     | CRUD for student records            |
| Teachers        | `/teacher`      | Manage teacher profiles             |
| Assignments     | `/assignment`   | Upload, submit, mark assignments    |
| Quizzes         | `/quiz`         | Quiz creation, submission, results  |
| Course Material | `/material`     | Upload/download materials           |
| Attendance      | `/`             | Record & fetch attendance           |
| Merit List      | `/meritList`    | Manage department-wise merit list   |
| Fee Structure   | `/feeStructure` | View/update course fee details      |
| Departments     | `/department`   | List and manage departments         |
| Time Table      | `/timeTable`    | Get and manage department schedules |
| Users/Auth      | `/user`         | User registration & login           |

---

## 📌 Key Features

* 🔐 JWT-based User Authentication
* 📝 File Upload for Assignments via **Multer**
* 📚 Course Materials Hosting
* 📊 Assignment & Quiz Submission & Evaluation
* 🗂️ Department & Fee Structure Management
* ⏰ Dynamic Timetable Handling
* 📈 Merit List & Attendance Tracking

---

## 📁 Important Controllers & Methods

Each module contains its own controller file with respective methods:

**Examples from `assignmentController.js`:**

* `createAssignment(req, res)`
* `submitAssignment(req, res)`
* `markAssignment(req, res)`
* `getAssignments(req, res)`
* `getAssignmentById(req, res)`
* `deleteAssignmentById(req, res)`
* `updateAssignmentById(req, res)`

> Similar structure and function naming is followed across all controllers for consistency and maintainability.

---

## 🤝 Contributions

This project was made specifically for a client’s academic LMS use-case, but feel free to fork or study the structure if you’re building something similar.

---

## 🧠 Developed By

**Ahmad Raza**
Backend Developer @ Pirate Coderz ⚓
Let’s connect on [LinkedIn](https://www.linkedin.com/in/ahmad-raza0)
Got a project in mind? → DM me!

---

## 📜 License

This project is licensed under the ISC License.

---

## 💬 Let's Talk

If your current backend is messy, slow, or doesn’t scale —
**let’s talk about how to make it right** ⚡

---
