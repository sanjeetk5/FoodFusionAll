// SignUpPage.jsx
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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { registerNow, registerReset } from "../redux/LoginReducer/Action";
import { REGISTER_SUCC } from "../redux/LoginReducer/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navi = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetails] = useState({ email: "", password: "", name: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const loading = useSelector((store) => store.LoginReducer.isLoading);
  const registered = useSelector((store) => store.LoginReducer.isRegistered);
  const registerError = useSelector((store) => store.LoginReducer.error);

  // snack state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const navTimeoutRef = useRef(null);

  useEffect(() => {
    if (registered) {
      setSnackMsg("Account created successfully! Redirecting...");
      setSnackSeverity("success");
      setSnackOpen(true);

      // navigate after short delay so user sees toast
      navTimeoutRef.current = setTimeout(() => {
        dispatch(registerReset());
        navi("/");
      }, 1200);
    }
    return () => {
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [registered, dispatch, navi]);

  useEffect(() => {
    if (registerError) {
      const msg = typeof registerError === "string" ? registerError : registerError?.message || "Failed to register.";
      setSnackMsg(msg);
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  }, [registerError]);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  async function register(e) {
    e.preventDefault();

    if (!details.name || !details.email || !details.password) {
      setSnackMsg("Please fill all fields.");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }
    if (!acceptedTerms) {
      setSnackMsg("Please accept Terms & Conditions.");
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    try {
      // dispatch register thunk
      const res = await dispatch(registerNow(details));
      // res may contain user or not. figure out user object fallback
      const returnedUser = res?.user || res?.data?.user || res?.data || null;
      const userToStore = returnedUser || { name: details.name, email: details.email };

      // ensure redux has REGISTER_SUCC with user payload (in case action didn't store user)
      dispatch({ type: REGISTER_SUCC, payload: userToStore });

      // ensure persisted storage (the action also tries, but double ensure)
      try {
        localStorage.setItem("user", JSON.stringify(userToStore));
      } catch (err) {}

      // form cleared (UI)
      setDetails({ email: "", password: "", name: "" });
      setAcceptedTerms(false);
    } catch (err) {
      console.error("register failed (component):", err);
      // error handled via reducer and snack effect
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top left,#ffe0e0 0,transparent 45%), radial-gradient(circle at bottom right,#ffe0b2 0,transparent 55%), #fff7f7", display: "flex", alignItems: "center", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {/* left creative side */}
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ position: "relative", width: "100%", borderRadius: 4, overflow: "hidden", p: 3, background: "linear-gradient(135deg, rgba(255,77,77,0.95), rgba(255,183,77,0.95))", color: "#fff", boxShadow: 6, minHeight: { xs: 360, md: 420 } }}>
              {/* ... creative content (unchanged) */}
              <Stack spacing={3} sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 32, height: 32, borderRadius: 2, background: "rgba(255,255,255,0.9)" }} />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>FoodFusion</Typography>
                </Stack>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.1, mb: 1, fontSize: { xs: 26, md: 32 } }}>Join the food lovers club 🍕</Typography>
                  <Typography variant="body1" sx={{ maxWidth: 360 }}>Create your account to discover the best food around you, save your favourites, and track all your cravings in one place.</Typography>
                </Box>

                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Paper sx={{ p: 2, borderRadius: 3, display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }} elevation={0}>
                    <Avatar sx={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.9)", color: "#ff4d4d", fontWeight: 700 }}>4.8★</Avatar>
                    <Box>
                      <Typography variant="subtitle2">Loved by thousands of foodies</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>Discover top-rated restaurants and hidden gems.</Typography>
                    </Box>
                  </Paper>

                  <Paper sx={{ p: 2, borderRadius: 3, display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }} elevation={0}>
                    <Avatar sx={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.9)", color: "#ff8a65", fontWeight: 700 }}>🚀</Avatar>
                    <Box>
                      <Typography variant="subtitle2">One-tap re-order</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>Save your go-to orders and repeat them instantly.</Typography>
                    </Box>
                  </Paper>
                </Stack>

                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>“Good food is all the sweeter when shared with good friends.”</Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Right: sign up form */}
          <Grid item xs={12} sm={6} md={6}>
            <Box component={Paper} elevation={6} sx={{ borderRadius: 4, p: { xs: 3, sm: 4 }, maxWidth: "100%", mx: "auto", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Stack spacing={2.5}>
                <Box textAlign={isMobile ? "center" : "left"}>
                  <Avatar sx={{ width: 52, height: 52, mb: 1, mx: isMobile ? "auto" : 0, background: "linear-gradient(135deg, #ff4d4d 0%, #ffb74d 100%)" }}>
                    <MailOutlineIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Create your account</Typography>
                  <Typography variant="body2" color="text.secondary">Sign up to explore restaurants, save favourites and order your favourite dishes in seconds.</Typography>
                </Box>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ borderRadius: 999 }}>Continue with Google</Button>
                  <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 999 }}>Facebook</Button>
                </Stack>

                <Divider>or sign up with email</Divider>

                <Stack component="form" onSubmit={register} spacing={2}>
                  <TextField fullWidth label="Full Name" variant="outlined" size="small" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                  <TextField fullWidth label="Email address" type="email" variant="outlined" size="small" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField fullWidth label="Password" type="password" variant="outlined" size="small" value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} />
                  </Stack>

                  <FormControlLabel control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} size="small" />} label={<Typography variant="body2">I agree to the <Box component="span" sx={{ color: "primary.main" }}>Terms & Conditions</Box> and <Box component="span" sx={{ color: "primary.main" }}>Privacy Policy</Box>.</Typography>} />

                  <Button variant="contained" fullWidth type="submit" disabled={loading} sx={{ borderRadius: 999, py: 1.2, fontWeight: 600, fontSize: 15, background: "linear-gradient(135deg, #ff4d4d 0%, #ff8a65 100%)", boxShadow: "0 10px 25px rgba(255,77,77,0.4)" }}>
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                </Stack>

                <Typography variant="body2" color="text.secondary" textAlign="center">Already have an account? <Box component="span" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => navi("/SignIn")}>Sign in</Box></Typography>

                <Typography variant="caption" color="text.secondary" textAlign="center">You’ll receive occasional updates about new offers, personalised recommendations and order updates.</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Backdrop loader */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!!loading}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography sx={{ fontWeight: 600 }}>{loading ? "Creating account..." : "Loading..."}</Typography>
        </Stack>
      </Backdrop>

      {/* Snack */}
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: "100%" }}>{snackMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
