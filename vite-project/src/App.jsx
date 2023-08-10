import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContext, UserContextProvider } from "./context/userContext";
import { DashBoard } from "./pages/DashBoard";

function App() {
  const [count, setCount] = useState(0);
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {user && <Route path="/dashboard" element={<DashBoard />} />}
        
      </Routes>
    </>
  );
}

export default App;
