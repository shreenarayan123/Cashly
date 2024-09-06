import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import {SendMoney} from './pages/SendMoney';
import SidebarHome from './components/SidebarHome';
import History from './components/History';
import Settings from './components/Settings';





function App() {
  const token = localStorage.getItem("token");

  return (
   <>
   <BrowserRouter>
   <Routes>
    {token ?
      <Route path='/dashboard'   element={<Dashboard/>}  />
      :
      <Route path='/' element={<Home/>} />
    }
    <Route path='/signup' element={<Signup/>} />
    <Route path='/signin' element={<Signin/>} />
    <Route path='/send' element={<SendMoney/>} />
    <Route path='/home' element={<SidebarHome/>} />
    <Route path='/history' element={<History/>} />
    <Route path='/settings' element={<Settings/>} />
    
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
 