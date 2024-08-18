// import React from 'react';
import { Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import Layout from "./components/layout";

function App() {
  return (
    <Routes>
      {/* Wrap all routes with Layout to include the Navbar */}
      <Route path="/" element={<Layout />}>
        <Route path="/Home" element={<div>Home Component</div>} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/AllPosts" element={<AllPosts />} />
      </Route>
    </Routes> 
  );
}

export default App;
