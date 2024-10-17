import { Link } from "react-router-dom";
import { Button, Avatar, Popover } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import "../../../styles/layout/navbarDropdownItemsList.css";
import { useState } from "react";
import PropTypes from "prop-types";
const NavbarDropdownItem = ({ item, hide }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openItemMenu = Boolean(anchorEl);
  const id = openItemMenu ? "simple-popover" : undefined;

  return (
    <div className="dropdown-navbar-item-wrapper">
      <div className="button-avatar-wrapper">
        <div className="dropdown-avatar">
          <Avatar
            alt={item.avatarAlt}
            src={item.avatarSrc}
            sx={{ width: 54, height: 54 }}
          />
        </div>
        <div className="dropdown-button">
          <Button
            size="large"
            fullWidth={true}
            onClick={handleClick}
            className="dropdown-button"
          >
            {item.itemName}
          </Button>
        </div>
      </div>
      <Popover
        id={id}
        open={openItemMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 10,
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="sideMenu">
          <Link to={item.linkAddPath} style={{ textDecoration: "none" }}>
            {" "}
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              size="large"
              style={{
                height: "35px",
                borderBottom: "1px solid black",
                borderRadius: "0px",
              }}
              fullWidth={true}
              onClick={() => {
                handleClose();
                hide();
              }}
            >
              New
            </Button>
          </Link>
          <Link to={item.linkTablePath} style={{ textDecoration: "none" }}>
            {" "}
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ height: "35px", borderRadius: "0px" }}
              fullWidth={true}
              onClick={() => {
                handleClose();
                hide();
              }}
            >
              Collection
            </Button>
          </Link>
        </div>
      </Popover>
    </div>
  );
};

NavbarDropdownItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    avatarAlt: PropTypes.string,
    avatarSrc: PropTypes.string,
    itemName: PropTypes.string,
    linkAddPath: PropTypes.string,
    linkTablePath: PropTypes.string,
  }),
  hide: PropTypes.func,
};

export default NavbarDropdownItem;
