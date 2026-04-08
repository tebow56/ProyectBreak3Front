import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './App.css'
import UserHome from './pages/user/UserHome'
import UserHistorial from './pages/user/UserHistorial'
import UserPerfil from './pages/user/UserPerfil'
import Login from './pages/user/Login'
import Root from './pages/user/Root'
import { AuthProvider } from './context/authContext'
import { BasicProvider } from './context/basicContext'

function App() {


  return (
    <>
    <BasicProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <AuthProvider>
            <Root />
          </AuthProvider>
        }>
          <Route index element={<UserHome />} />
          <Route path="/historial" element={<UserHistorial />} />
          <Route path="/perfil" element={<UserPerfil />} />
        </Route>
      </Routes>
    </Router>
    </BasicProvider>
    </>
  )
}

export default App


