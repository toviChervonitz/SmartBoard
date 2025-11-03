import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import PublicPosts from './pages/PublicPosts';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PublicPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
