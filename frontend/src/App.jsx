import { useState } from 'react'
import './App.css'
import {
  Navigate, Route, BrowserRouter as Router
  , Routes
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/layout/MainLayout'
import AdminRoute from './routes/AdminRoute'
import AdminUsers from './pages/AdminUsers'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route
              path="/dashboard"
              element={

                <Dashboard />

              }
            />
                      <Route element={<AdminRoute />}>
              <Route path="/users" element={<AdminUsers/>} />
              </Route>
            <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
