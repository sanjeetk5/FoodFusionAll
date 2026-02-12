// src/components/Layout.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../pages/CartContext";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

const Layout = ({ cartCount: cartCountProp }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useCart() || { cartItems: [] };
  const countFromContext = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.qty || 0), 0)
    : 0;
  const cartCount = cartCountProp ?? countFromContext;

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check auth token: prefer redux token, fallback to localStorage
  const reduxToken = useSelector((s) => s.LoginReducer?.token);
  const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const tokenExists = !!(reduxToken || localToken);

  // Avatar menu state (we only show a simple menu with Welcome, Profile, Logout)
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    // Clear auth in redux & local storage
    dispatch({ type: "LOGOUT" }); // ensure your reducer handles LOGOUT
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {}
    navigate("/SignIn");
  };

  const linkButtonStyle = ({ isActive }) => ({
    color: isActive ? "#ff4d4d" : "inherit",
    fontWeight: isActive ? 700 : 500,
    textDecoration: "none",
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.9)",
          color: "text.primary",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              component={NavLink}
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
            >
              <Box component="img" src={logo} alt="FoodFusion logo" sx={{ height: 32, width: "auto", mr: 1, display: "block" }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                FoodFusion
              </Typography>
            </Box>
          </Stack>

          {/* Desktop nav */}
          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center">
              {navItems.map((item) => (
                <Button key={item.to} component={NavLink} to={item.to} style={linkButtonStyle}>
                  {item.label}
                </Button>
              ))}

              <IconButton component={NavLink} to="/cart" style={linkButtonStyle}>
                <Badge badgeContent={cartCount} color="primary" showZero>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* AUTH AREA: If logged in show avatar + "Welcome", otherwise show Sign in / Sign up */}
              {!tokenExists ? (
                <>
                  <Button variant="text" sx={{ fontWeight: 500 }} component={NavLink} to="/SignIn">
                    Sign in
                  </Button>
                  <Button variant="contained" component={NavLink} to="/SignUp" sx={{ borderRadius: 999, px: 2.5 }}>
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title="Welcome">
                    <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: "#ff6b6b", width: 40, height: 40 }}>🙂</Avatar>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Welcome
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
          )}

          {/* Mobile nav */}
          {isMobile && (
            <>
              <IconButton component={NavLink} to="/cart" style={linkButtonStyle} sx={{ mr: 1 }}>
                <Badge badgeContent={cartCount} color="primary" showZero>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 280, p: 2 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Box component="img" src={logo} alt="FoodFusion logo" sx={{ height: 28, width: "auto", display: "block" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Menu
                    </Typography>
                  </Stack>

                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item.to} disablePadding>
                        <ListItemButton component={NavLink} to={item.to} style={linkButtonStyle}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}

                    <ListItem disablePadding>
                      <ListItemButton component={NavLink} to="/cart">
                        <ListItemText primary="Cart" />
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Box sx={{ mt: 2 }}>
                    {!tokenExists ? (
                      <>
                        <Button fullWidth variant="outlined" component={NavLink} to="/SignIn" sx={{ mb: 1 }}>
                          Sign in
                        </Button>
                        <Button fullWidth variant="contained" component={NavLink} to="/SignUp">
                          Sign up
                        </Button>
                      </>
                    ) : (
                      <>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <Avatar sx={{ bgcolor: "#ff6b6b" }}>🙂</Avatar>
                          <Box>
                            <Typography variant="subtitle2">Welcome</Typography>
                          </Box>
                        </Stack>
                        <Button fullWidth variant="outlined" onClick={() => navigate("/profile")} sx={{ mb: 1 }}>
                          Profile
                        </Button>
                        <Button fullWidth variant="contained" color="error" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Render route content */}
      <Outlet />
    </>
  );
};

export default Layout;
