import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import PublicPosts from './pages/PublicPosts';
import MyPosts from "./pages/MyPosts.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PublicPosts />} />
        <Route path="/myPost" element={<MyPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
