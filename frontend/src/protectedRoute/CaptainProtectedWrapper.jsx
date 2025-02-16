import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedPage = ({ children }) => {
  const { setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    } else {
      setCaptain(JSON.parse(localStorage.getItem("captain")));
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default CaptainProtectedPage;
