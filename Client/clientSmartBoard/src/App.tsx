import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import PublicPosts from './pages/PublicPosts';
import MyPosts from "./pages/MyPosts.tsx";
import EditOrAddPost from "./components/EditOrAddPost.tsx";
import FavoritePosts from "./pages/FavoritePosts.tsx"
import Navbar from './components/Navbar';
import { Favorite } from "@mui/icons-material";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publicPosts" element={<PublicPosts />} />
        <Route path="/myPost" element={<MyPosts />} />
        <Route path="/addPost" element={<EditOrAddPost />} />
        <Route path="/my-favorites" element={<FavoritePosts />} />
      </Routes>
    </Router>
  );
};

export default App;
