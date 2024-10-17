import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import "../../../styles/form/formAlerts.css";
const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="success-alert">
      <Alert
        severity="success"
        variant="filled"
        onClose={onClose}
        sx={{ maxWidth: "400px" }}
      >
        {message}
      </Alert>
    </div>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessAlert;
