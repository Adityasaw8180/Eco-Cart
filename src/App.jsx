import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import './App.css'
import Splash from './pages/Splash'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Header from './components/Header'
import Help from './pages/Help'
// import Details from './pages/Details';
import Pd from './pages/Pd'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'


function App() {
  // return <Splash/>

  return (
    // <>
    //   {/* <Login></Login> */}
    //   <Signup></Signup>
    // </>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Splash />}></Route>
          <Route path='/home' element={<Home />}>Home</Route>
          <Route path="/signup" element={<Signup />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help/>}></Route>
          {/* <Route path="/details/:id" element={<Details/>}></Route> */}
          <Route path="/product/:id" element={<Pd />} />

          <Route path='/pd' element={<Pd/>}></Route>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/account' element={<Account/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
