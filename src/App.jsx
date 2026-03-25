import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/Register-Comonenets/Register";
import Login from "../src/Login-Components/Login";
import Dashboard from "../src/MainPages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;