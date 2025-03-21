# Posts and Users UI (React)
A modern **React + TypeScript** application for managing posts and users, now featuring **Material UI** for an enhanced UI experience.

## 📌 Features
✅ **Post Management**: Create, list, and delete posts.  
✅ **User Management**: Register users, search users, and view profiles.  
✅ **User Availability Scheduling**: Schedule availability using **Material UI DatePicker**.  
✅ **Enhanced UI with Material UI**: Fully responsive design.  
✅ **Optimized Performance**: Using **React Hooks** for state management.  
✅ **Backend Integration**: Connected to a **Node.js + Express API**.  

---

## 🚀 Technology Stack
- **Framework**: React + TypeScript
- **UI Components**: Material UI
- **Backend**: Node.js + Express (REST API)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Form Handling**: Controlled components
- **Routing**: React Router
- **Styling**: Material UI + CSS Modules

---

## 📂 Project Structure
```
src/
│── components/
│   ├── Header/                   # App Header (Navigation)
│   ├── NewPost/                  # Create a New Post
│   ├── PostList/                 # List of Posts
│   ├── PostListItem/             # Single Post Item
│   ├── UserList/                 # List of Users
│   ├── UserListItem/             # Single User Item
│   ├── UserProfile/              # User Profile
│   ├── UserSearch/               # Search Users by Email
│   ├── UserAvailability/         # Schedule User Availability
│   ├── NewUser/                  # Register a New User
│── models/                       # Data Models (User, Post)
│── services/                     # Services (UserService, PostService)
│── App.tsx                       # Root Component
│── index.tsx                     # Entry Point
│── package.json                   # Dependencies
│── README.md                      # Project Documentation
```

---

## 🛠 Installation & Setup
### 1️⃣ Install Dependencies
Make sure you have **Node.js** installed, then run:
```sh
npm install
```

### 2️⃣ Run the Application
Start the development server:
```sh
npm start
```
The app will be available at: **http://localhost:4201/**

---

## 📜 Available Routes
| Path                          | Component          | Description                |
| ----------------------------- | ------------------ | -------------------------- |
| `/posts`                      | `PostList`         | View all posts             |
| `/new-post`                   | `NewPost`          | Create a new post          |
| `/users`                      | `UserList`         | View users list            |
| `/users/:id`                  | `UserProfile`      | View user profile          |
| `/new-user`                   | `NewUser`          | Register a new user        |
| `/user-search`                | `UserSearch`       | Search for users by email  |
| `/user-availability-schedule` | `UserAvailability` | Schedule user availability |