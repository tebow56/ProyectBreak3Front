import {BrowserRouter as Router, Routes, Route, data} from 'react-router-dom'
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
import UserProposal from './pages/user/UserPropuesta'
import AdminProposal from './pages/admin/AdminPropuestas'
import AdminNuevaPropuesta from './pages/admin/AdminNuevaPropuesta'
import AltaCliente from './pages/AltaCliente'
import UserPedido from './pages/user/UserPedido'
import AdminPedido from './pages/admin/AdminPedido'

function App() {


  return (
    <>
    <BasicProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/altacliente" element= {<AltaCliente/>}/>
        <Route path="/user" element={
          <AuthProvider>
            <Root />
          </AuthProvider>
        }>
          <Route index element={<UserHome />} />
          <Route path= "/user/propuestas/:proposalId" element={<UserProposal/> } />
          <Route path="/user/historial" element={<UserHistorial />} />
          <Route path= "/user/historial/:orderId" element= {<UserPedido/>}/>
          <Route path="/user/perfil" element={<UserPerfil />} />
        </Route>
                <Route path="/admin" element={
          <AuthProvider>
            <AdminRoot />
          </AuthProvider>
        }>
          <Route index element={<AdminHome />} />
          <Route path="/admin/propuestas/nueva" element={<AdminNuevaPropuesta />} />
          <Route path= "/admin/propuestas/:proposalId" element={<AdminProposal/> } />
          <Route path="/admin/historial" element={<AdminHistorial />} />
          <Route path="/admin/historial/:orderId" element={<AdminPedido/>} />
          <Route path="/admin/perfil" element={<AdminPerfil />} />
        </Route>
      </Routes>
    </Router>
    </BasicProvider>
    </>
  )
}

export default App


