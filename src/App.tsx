import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import NewPost from "./components/NewPost/NewPost";
import PostList from "./components/PostList/PostList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/users" element={<div>Users Page</div>} />
        <Route path="/new-user" element={<div>Add New User</div>} />
        <Route path="/user-search" element={<div>Search Users</div>} />
        <Route path="/user-availability-schedule" element={<div>Schedule Availability</div>} />
      </Routes>
    </Router>
  );
}

export default App;
