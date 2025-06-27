
# 🗂️ Task Manager

A simple and elegant task management application built with **React + Vite**, using **Redux Toolkit**, **Axios**, and **Tailwind CSS**. Create, update, delete, and filter tasks visually with responsive cards and a smooth UX.

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Cirilplackal/task-manager.git
cd task-manager
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Mock API

```bash
npx json-server --watch db.json --port 3001
```
### 3. Start the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🗃️ Folder Structure

```bash
src/
├── api/               # Axios instance setup
├── components/        # Reusable UI components (Card, CreateTask, etc.)
├── constants/         # Default values
├── features/    # Redux slice (CRUD logic)
├── pages/Tasks.jsx    # Main UI with routing, filters
├── App.jsx            # Routes + layout
└── main.jsx           # ReactDOM entry
```

---

## ⚙️ Technologies Used

* **React** with **Vite**
* **Redux Toolkit**
* **Axios**
* **Tailwind CSS**
* **React Router**
* `json-server`



