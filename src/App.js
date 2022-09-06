import React from 'react';
import './App.css';
// import pages
import HomePage from "./Pages/HomePage/HomePage"
import LikedPage from "./Pages/LikedPage/LikedPage"
import AddPostPage from "./Pages/AddPostPage/AddPostPage"
import MyPostPage from './Pages/MyPostPage/MyPostPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Error404 from './Pages/Error404/Error404';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
// import utils
import ProtectedRoute from './Utils/ProtectedRoute/ProtectedRoute';
// import router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapScreen from './Pages/Map/Map';


function App() {
  return (
    <div className="app">

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
            path='/map'
            element={<MapScreen />}
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
              <ProtectedRoute>
                <AddPostPage />
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
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
