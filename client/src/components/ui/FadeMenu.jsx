import LogoutIcon from "@mui/icons-material/Logout";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { apiClient } from "../../services/api/config/axiosConfig";
import { useNavigate } from "react-router-dom";

const FadeMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await apiClient.get("auth/logout");
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <>
      <div>
        <LogoutIcon
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          fontSize="medium"
        ></LogoutIcon>

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default FadeMenu;
