// SignInPage.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox,
  Avatar,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginNow } from "../redux/LoginReducer/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const loading = useSelector((store) => store.LoginReducer.isLoading);
  const token = useSelector((store) => store.LoginReducer.token);
  const loginError = useSelector((store) => store.LoginReducer.error);

  // Snack state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("info");

  // navigate after success if needed
  const navRef = useRef(null);

  useEffect(() => {
    // If token already exists (user already logged in), navigate
    if (token) {
      setSnackMsg("Login successful! Redirecting...");
      setSnackSeverity("success");
      setSnackOpen(true);
      navRef.current = setTimeout(() => {
        navigate("/");
      }, 800);
    }
    return () => {
      if (navRef.current) clearTimeout(navRef.current);
    };
  }, [token, navigate]);

  useEffect(() => {
    if (loginError) {
      const msg =
        typeof loginError === "string"
          ? loginError
          : loginError?.message || "Login failed. Please try again.";
      setSnackMsg(msg);
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  }, [loginError]);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!details.email || !details.password) {
      setSnackMsg("Please enter both email and password.");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    // dispatch the login thunk (assumes it returns a promise and res.data)
    dispatch(loginNow(details))
      .then((res) => {
        // our action returns res.data (see Action.js); it may contain token property
        // handle both: res?.token or store's token updated via reducer
        if (res && (res.token || res.data?.token)) {
          setSnackMsg("Login successful!");
          setSnackSeverity("success");
          setSnackOpen(true);
          // navigate after short delay so user sees toast
          navRef.current = setTimeout(() => {
            navigate("/home");
          }, 700);
        } else {
          // fallback: some APIs return success but token stored in reducer; rely on token selector
          if (token) {
            navigate("/home");
          } else {
            setSnackMsg("Login successful.");
            setSnackSeverity("success");
            setSnackOpen(true);
          }
        }
      })
      .catch((err) => {
        console.error("login error:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to login. Please check credentials.";
        setSnackMsg(msg);
        setSnackSeverity("error");
        setSnackOpen(true);
      })
      .finally(() => {
        // clear local fields (optional)
        setDetails({ email: "", password: "" });
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#ffe0e0 0,transparent 45%), radial-gradient(circle at bottom right,#ffe0b2 0,transparent 55%), #fff7f7",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {/* LEFT: creative panel (hidden on xs/sm) */}
          <Grid item md={4} sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                p: 3,
                background: "linear-gradient(135deg, rgba(255,77,77,0.95), rgba(255,183,77,0.95))",
                color: "#fff",
                boxShadow: 6,
              }}
            >
              <Box sx={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.18)", top: -30, right: -30, filter: "blur(1px)" }} />
              <Box sx={{ position: "absolute", width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.14)", bottom: -20, left: -10, filter: "blur(1px)" }} />

              <Stack spacing={3} sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 30, height: 30, borderRadius: 2, background: "rgba(255,255,255,0.9)" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    FoodFusion
                  </Typography>
                </Stack>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.1, mb: 1 }}>
                    Welcome back, foodie 👋
                  </Typography>
                  <Typography variant="body2" sx={{ maxWidth: 260 }}>
                    Sign in to track your orders, reorder favourites and discover new places to eat.
                  </Typography>
                </Box>

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  <Paper sx={{ p: 1.5, borderRadius: 3, display: "flex", alignItems: "center", gap: 1.5, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }} elevation={0}>
                    <Avatar sx={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.9)", color: "#ff4d4d", fontWeight: 700, fontSize: 14 }}>🔔</Avatar>
                    <Box>
                      <Typography variant="subtitle2">Live order updates</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                        Track your food in real-time.
                      </Typography>
                    </Box>
                  </Paper>

                  <Paper sx={{ p: 1.5, borderRadius: 3, display: "flex", alignItems: "center", gap: 1.5, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }} elevation={0}>
                    <Avatar sx={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.9)", color: "#ff8a65", fontWeight: 700, fontSize: 14 }}>❤️</Avatar>
                    <Box>
                      <Typography variant="subtitle2">Save your favourites</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                        Quickly access your go-to dishes.
                      </Typography>
                    </Box>
                  </Paper>
                </Stack>

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
                  “People who love to eat are always the best people.”
                </Typography>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT: sign-in form */}
          <Grid item xs={12} md={8}>
            <Box component={Paper} elevation={6} sx={{ borderRadius: 4, p: { xs: 3, sm: 4 }, maxWidth: 520, mx: "auto", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
              <Stack spacing={2.5}>
                <Box textAlign={isMobile ? "center" : "left"}>
                  <Avatar sx={{ width: 52, height: 52, mb: 1, mx: isMobile ? "auto" : 0, background: "linear-gradient(135deg, #ff4d4d 0%, #ffb74d 100%)" }}>
                    <LockOutlinedIcon sx={{ fontSize: 26 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Sign in to your account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back! Enter your details to continue.
                  </Typography>
                </Box>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ borderRadius: 999 }}>
                    Continue with Google
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 999 }}>
                    Facebook
                  </Button>
                </Stack>

                <Divider>or sign in with email</Divider>

                {/* Form - submit button moved inside this form stack */}
                <Stack component="form" onSubmit={submit} spacing={2}>
                  <TextField
                    fullWidth
                    label="Email address"
                    type="email"
                    variant="outlined"
                    size="small"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    value={details.password}
                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                  />

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Remember me</Typography>} />
                    <Typography variant="body2" sx={{ color: "primary.main", cursor: "pointer" }}>
                      Forgot password?
                    </Typography>
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    sx={{
                      borderRadius: 999,
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: 15,
                      background: "linear-gradient(135deg, #ff4d4d 0%, #ff8a65 100%)",
                      boxShadow: "0 10px 25px rgba(255,77,77,0.4)",
                    }}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </Stack>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Don’t have an account? <Box component="span" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => navigate("/signup")}>Sign up</Box>
                </Typography>

                <Typography variant="caption" color="text.secondary" textAlign="center">
                  We’ll use your account to keep your orders, favourites and delivery details in sync.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Loading backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }} open={!!loading}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography sx={{ fontWeight: 600 }}>{loading ? "Signing in..." : "Loading..."}</Typography>
        </Stack>
      </Backdrop>

      {/* Snack */}
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignIn;
