import React from "react";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    axios.defaults.headers.authorization = ``;
    navigate("/login");
  }
  return (
    <nav className="main-nav">
      <h1 className="logo">TOKO</h1>
      <Button type="primary" onClick={handleLogOut}>Log out</Button>
    </nav>
  );
};

export default Navbar;
