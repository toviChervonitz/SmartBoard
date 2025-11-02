import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PublicPosts from './pages/PublicPosts';

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/" element={<PublicPosts />} />
      </Routes>
    </Router>
  )
}

export default App
