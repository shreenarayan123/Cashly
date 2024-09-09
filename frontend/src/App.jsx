import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import {SendMoney} from './pages/SendMoney';
import SidebarHome from './components/SidebarHome';
import History from './components/History';
import Settings from './components/Settings';
import { useState } from 'react';





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send" element={isAuthenticated ? <SendMoney /> : <Navigate to="/signin" />} />
        <Route path="/home" element={isAuthenticated ? <SidebarHome /> : <Navigate to="/signin" />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 