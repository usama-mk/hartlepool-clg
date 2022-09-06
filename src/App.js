import React from 'react';
import './App.css';
// import pages
import HomePage from "./Pages/HomePage/HomePage"
import LikedPage from "./Pages/LikedPage/LikedPage"
import AddPostPage from "./Pages/AddPostPage/AddPostPage"
import AddGroupPage from "./Pages/AddGroupPage/AddGroupPage"
import MyPostPage from './Pages/MyPostPage/MyPostPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Error404 from './Pages/Error404/Error404';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
// import utils
import ProtectedRoute from './Utils/ProtectedRoute/ProtectedRoute';
// import router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpPage from './Pages/HelpPage/HelpPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 404 */}
        <Route
          path='*'
          element={<Error404 />
          }
        />


        {/* LOGIN & SIGNUP */}
        {/* public routes */}
        <Route
          path='/'
          element={<LoginPage />}
        />

        <Route
          path='/register'
          element={<RegisterPage />}
        />


        {/* PAGES */}
        {/* protected routes */}
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/liked-posts'
          element={
            <ProtectedRoute>
              <LikedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/add-post'
          element={
            <ProtectedRoute teacherOnly={true}>
              <AddPostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/add-group'
          element={
            <ProtectedRoute teacherOnly={true}>
              <AddGroupPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/my-posts'
          element={
            <ProtectedRoute>
              <MyPostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/help'
          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
