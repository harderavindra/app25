import { useState } from 'react'
import './App.css'
import { Navigate, Route,   BrowserRouter as Router
, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './pages/Dashboard'

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
  )
}

export default App
