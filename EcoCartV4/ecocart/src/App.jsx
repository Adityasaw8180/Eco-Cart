import { useState } from 'react'
import Login from './pages/Login'
import './App.css'
import Splash from './pages/Splash'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Header from './components/Header'
import Help from './pages/Help'
import Pd from './pages/Pd'
import Wishlist from './pages/Wishlist'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './firebase/AuthContext'
import { useAuth } from './firebase/AuthContext'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-eco-dark to-dark text-light">
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none"></div>
      <AuthProvider>
        <Router>
          <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path='/' element={<Splash />} />
                <Route path='/home' element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/help" element={<Help />} />
                <Route path="/product/:id" element={
                  <ProtectedRoute>
                    <Pd />
                  </ProtectedRoute>
                } />
                <Route path='/pd' element={
                  <ProtectedRoute>
                    <Pd />
                  </ProtectedRoute>
                } />
                <Route path='/wishlist' element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
