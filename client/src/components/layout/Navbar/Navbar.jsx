import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  CssBaseline,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { AppBar } from "../../ui/AppBar";
import { Drawer } from "../../ui/Drawer";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import itemsData from "./NavbarDropdownItemsData";
import FadeMenu from "../../ui/FadeMenu";
import "../../../styles/layout/navbar.css";
import { useToggle } from "../../../hooks/features/useToogle";
import NavbarDropdownItem from "./NavbarDropdownItem";

const Navbar = () => {
  const [open, toggle, setOpen] = useToggle();
  const hide = useCallback(() => setOpen(false), [setOpen]);

  const dropdownItem = itemsData.map((item) => (
    <NavbarDropdownItem item={item} key={item.id} hide={hide} />
  ));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggle}
              sx={{
                marginRight: "36px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Digitalni Arhiv Široki Brijeg
            </Typography>

            <IconButton color="inherit">
              <FadeMenu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Link to="/app" style={{ textDecoration: "none" }}>
            <div className="dashboard-link-div">
              {/* Ovo za boju buttona ce trebati jos vidit kad dodje theme provider */}
              <Button
                startIcon={<DashboardIcon />}
                size="large"
                className="dashboard-link"
                onClick={hide}
                sx={{ color: "#616161" }}
              >
                Dashboard
              </Button>
            </div>
          </Link>
          <Divider />
          {dropdownItem}
          <Divider />
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
