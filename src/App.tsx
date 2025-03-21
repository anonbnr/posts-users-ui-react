import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import NewPost from "./components/NewPost/NewPost";
import NewUser from "./components/NewUser/NewUser";
import PostList from "./components/PostList/PostList";
import UserAvailability from "./components/UserAvailability/UserAvailability";
import UserList from "./components/UserList/UserList";
import UserProfile from "./components/UserProfile/UserProfile";
import UserSearch from "./components/UserSearch/UserSearch";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/user-search" element={<UserSearch />} />
        <Route path="/user-availability-schedule" element={<UserAvailability />} />
      </Routes>
    </Router>
  );
}

export default App;
