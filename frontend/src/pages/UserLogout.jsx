import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  /* const token = localStorage.getItem("token"); */
  console.log("hi");

  const navigate = useNavigate();
  const logout = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      console.log("loged out");
      localStorage.removeItem("token");
      localStorage.removeItem("user-data");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      console.log("nothing happend");
    }
    console.log(response);
  };
  logout();

  return <div>UserLogout</div>;
};

export default UserLogout;
