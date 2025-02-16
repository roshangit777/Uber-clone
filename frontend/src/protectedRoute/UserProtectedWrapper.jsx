import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const ProtectedPage = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default ProtectedPage;
