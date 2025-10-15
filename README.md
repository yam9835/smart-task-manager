

                                                          **Smart Task Planner**

## 📋 Overview

**Smart Task Planner** is a MERN stack-based productivity tool powered by an **LLM (ChatGPT / MPT / any supported model)** that intelligently generates and manages project plans.
It allows users to input project goals, automatically create structured task breakdowns, manage dependencies, and visualize timelines — helping developers, students, and teams plan projects effectively.

---

## 🚀 Features

✅ **AI-Powered Task Generation** — Automatically generates project plans and dependencies using an LLM.
✅ **Task Management** — Add, edit, delete, and view tasks.
✅ **Dependency Mapping** — Handles dependencies between tasks to optimize planning.
✅ **Progress Tracking** — Monitor ongoing and completed tasks.
✅ **Responsive UI** — Clean, fast, and user-friendly React interface.
✅ **Backend API Integration** — Node.js + Express server for task data handling.
✅ **Secure Configuration** — Uses `.env` for sensitive data like API keys and ports.

---

## 🏗️ Tech Stack

| Component           | Technology Used                                   |
| ------------------- | ------------------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS                            |
| **Backend**         | Node.js, Express.js                               |
| **Database**        | MongoDB                                           |
| **LLM**             | OpenAI GPT                                        | 
| **Package Manager** | npm                                               |
| **Version Control** | Git + GitHub                                      |

---

## 📂 Folder Structure

```
smart-task-planner/
├── backend/
│   ├── index.js               # Express server entry point
│   ├── routes/                # API routes
│   ├── controllers/           # Logic for task planning
│   ├── models/                # MongoDB schemas
│   ├── package.json
│   ├── .env                   # Environment variables (keys, ports)
│
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Main pages (Home, Dashboard)
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/smart-task-planner.git
cd smart-task-planner
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

Run the backend:

```bash
node index.js
```

---

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`
Backend runs at `http://localhost:4000`

---

## 🧠 How the LLM Works

* When a user inputs a project idea or goal, the backend calls the **LLM API (OpenAI)**.
* The LLM generates a **task plan** with dependencies, estimated durations, and logical order.
* The response is stored and displayed in the frontend.
* This allows iterative updates — users can refine or expand their plans with follow-up prompts.

---

## 🧰 Example API Request

**POST** `/api/tasks/plan`

```json
{
  "projectTitle": "Build a To-Do Web App",
  "description": "A full-stack app with CRUD operations."
}
```

**Response Example**

```json
{
  "tasks": [
    {
      "id": "t1",
      "title": "Setup project structure",
      "estimate_days": 2,
      "depends_on": []
    },
    {
      "id": "t2",
      "title": "Create database schema",
      "estimate_days": 3,
      "depends_on": ["t1"]
    }
  ]
}
```

---

## 🧩 Environment Variables

| Variable         | Description                                         |
| ---------------- | --------------------------------------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key                                 |
| `OPENAI_MODEL`   | `gpt-4o-mini`
| `PORT`           | Backend port (default: 4000)                        |
                        |


---

## 🧪 Testing

To test API routes:

```bash
curl -X POST http://localhost:4000/api/tasks/plan \
-H "Content-Type: application/json" \
-d '{"projectTitle":"Test Project"}'
```

---

## 🐛 Troubleshooting

| Issue                   | Cause                 | Fix                               |
| ----------------------- | --------------------- | --------------------------------- |
| `401 Incorrect API Key` | Invalid OpenAI key    | Check `.env` file                 |
| `MongoNetworkError`     | MongoDB not connected | Verify `MONGO_URI`                |
| `fetch failed`          | Wrong backend URL     | Use `http://localhost:4000`       |
| `git index.lock`        | Stuck git process     | Delete `.git/index.lock` manually |

---

## 🌟 Future Enhancements

* ✅ Add project progress visualization (Gantt chart view)
* ✅ User authentication (login/signup)
* ✅ Export project plans as PDF or JSON
* ✅ Integration with Google Calendar or Trello

---


