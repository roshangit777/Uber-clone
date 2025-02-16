import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/logout`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      console.log("loged out");
      localStorage.removeItem("token");
      localStorage.removeItem("captain");
      localStorage.removeItem("user-data");
      navigate("/captain-login");
    }
  };
  logout();

  return <div>UserLogout</div>;
};

export default CaptainLogout;
