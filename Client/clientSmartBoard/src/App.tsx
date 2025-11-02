import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PublicPosts from './pages/PublicPosts';
import MyPosts from './pages/MyPosts';

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/" element={<PublicPosts />} />
        <Route path="/myPost" element={<MyPosts />} />
      </Routes>
    </Router>
  )
}

export default App
