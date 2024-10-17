import { createContext, useState, useEffect } from "react";
import { apiClient } from "../api/config/axiosConfig";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(null); // Start with null to check loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedLoggedInStatus = localStorage.getItem("loggedIn");
      if (storedLoggedInStatus === "true") {
        try {
          const response = await apiClient.get("auth/loggedIn");
          setLoggedIn(response.data); // Update state based on server response
        } catch (error) {
          console.error("Failed to check login status:", error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false); // If not logged in, set state to false
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      await apiClient.post("auth/login", credentials);
      localStorage.setItem("loggedIn", "true"); // Set loggedIn status in local storage
      setLoggedIn(true); // Update context state
    } catch (error) {
      console.error("Login failed:", error);
      alert("Pogresan E-mail ili Lozinka");
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.get("auth/logout"); // Call your logout API endpoint
      localStorage.removeItem("loggedIn"); // Remove loggedIn status from local storage
      setLoggedIn(false); // Update context state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
export { AuthContextProvider };
