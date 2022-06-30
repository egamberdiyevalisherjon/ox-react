import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Products />
      </div>
    </div>
  );
};

export default Home;
