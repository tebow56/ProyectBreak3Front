import {BrowserRouter as Router, Routes, Route, data} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './App.css'
import UserHome from './pages/user/UserHome'
import UserHistorial from './pages/user/UserHistorial'
import UserPerfil from './pages/user/UserPerfil'
import Login from './pages/Login'
import Root from './pages/user/Root'
import { AuthProvider } from './context/authContext'
import { BasicProvider } from './context/basicContext'
import AdminRoot from './pages/admin/AdminRoot'
import AdminHome from './pages/admin/AdminHome'
import AdminHistorial from './pages/admin/AdminHistorial'
import AdminPerfil from './pages/admin/AdminPerfil'
import UserProposal from './pages/user/UserProposal'
import AdminProposal from './pages/admin/AdminProposal'

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
          <Route path= "/propuestas/:proposalId" element={<UserProposal/> } />
          <Route path="/historial" element={<UserHistorial />} />
          <Route path="/perfil" element={<UserPerfil />} />
        </Route>
                <Route path="/admin" element={
          <AuthProvider>
            <AdminRoot />
          </AuthProvider>
        }>
          <Route index element={<AdminHome />} />
          <Route path= "/admin/propuestas/:proposalId" element={<AdminProposal/> } />
          <Route path="/admin/historial" element={<AdminHistorial />} />
          <Route path="/admin/perfil" element={<AdminPerfil />} />
        </Route>
      </Routes>
    </Router>
    </BasicProvider>
    </>
  )
}

export default App


