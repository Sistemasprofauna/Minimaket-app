import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./barraNav.css";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Button,
  Menu,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../components/AuthProvider";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    auth.signOut(() => {
      navigate("/login", {
        replace: true,
      });
    });
  };

  const buttons = [
    <Link to="/employees">
      <PersonIcon />
      Colaboradores
    </Link>,
    <Link to="/bonds">
      <AttachMoneyIcon />
      Asignar bonos
    </Link>,
  ];

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Responsive menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/employees">
                  <MenuItem key="page 1" onClick={handleCloseNavMenu}>
                    <PersonIcon />
                    Colaboradores
                  </MenuItem>
                </Link>
                <Link to="/bonds">
                  <MenuItem key="page 1" onClick={handleCloseNavMenu}>
                    <AttachMoneyIcon />
                    Asignar bonos
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            {/* Menu pantalla grande */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/employees">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <PersonIcon />
                  Colaboradores
                </Button>
              </Link>
              <Link to="/bonds">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <AttachMoneyIcon />
                  Asignar bonos{" "}
                </Button>
              </Link>
            </Box>

            {/* Boton salir */}
            <Box>
              <Button sx={{ color: "white" }} onClick={handleLogOut}>
                Salir
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
