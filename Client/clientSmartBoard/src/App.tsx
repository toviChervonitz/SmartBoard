import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PublicPosts from './pages/PublicPosts';
import MyPosts from './pages/MyPosts';
import EditOrAddPost from './components/EditOrAddPost';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPosts />} />
        <Route path="/myPost" element={<MyPosts />} />
        <Route path='/addPost' element={<EditOrAddPost />}></Route>
      </Routes>
    </Router>
  )
}

export default App
