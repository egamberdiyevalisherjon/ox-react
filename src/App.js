import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import axios from "axios";
import Alerts from "./Components/Alerts";

function App() {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.authorization = `Bearer ${token}`;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="alert-zone">
        <Alerts />
      </div>
    </>
  );
}

export default App;
