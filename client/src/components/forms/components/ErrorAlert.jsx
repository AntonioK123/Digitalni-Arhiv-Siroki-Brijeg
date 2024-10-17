import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import "../../../styles/form/formAlerts.css";

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="error-alert">
      <Alert
        severity="error"
        variant="filled"
        onClose={onClose}
        sx={{ maxWidth: "400px" }}
      >
        {message}
      </Alert>
    </div>
  );
};
ErrorAlert.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};
export default ErrorAlert;
