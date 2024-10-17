import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  return loggedIn ? element : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
