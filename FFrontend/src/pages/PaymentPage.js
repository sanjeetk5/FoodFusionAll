// PaymentPage.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Divider,
  TextField,
  Button,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

// OPTIONAL: if you have a CartContext with cartItems, totals, clearCart, import it.
// If not available, the page still works with safe defaults.
import { useCart } from "../pages/CartContext"; // adjust path if needed

const PaymentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // try to get cart from context, otherwise fallback
  const { cartItems = [], totals = null, clearCart } = useCart?.() ?? {
    cartItems: [],
    totals: null,
    clearCart: () => {},
  };

  // compute subtotal safely if totals not present
  const subtotal = useMemo(() => {
    if (totals?.subtotal || totals?.subtotal === 0) return totals.subtotal;
    if (!Array.isArray(cartItems) || cartItems.length === 0) return 0;
    return cartItems.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
  }, [totals, cartItems]);

  const deliveryFee = 40;
  const taxes = 25; // rough tax example 5%
  const grandTotal = subtotal + deliveryFee + taxes;

  // Payment state
  const [method, setMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const handlePlaceOrder = () => {
    // placeholder: in real app call backend / payment gateway
    // preserve functionality: clearCart if available and navigate to success page
    try {
      if (typeof clearCart === "function") clearCart();
    } catch (e) {
      // ignore
    }
    navigate("/order-success");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
        background:
          "radial-gradient(circle at top left,#fff0f0 0, transparent 45%), radial-gradient(circle at bottom right,#fff8e6 0,transparent 55%), #fff7f7",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, textAlign: { xs: "center", md: "left" } }}
        >
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT: Payment form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                borderRadius: 3,
                p: { xs: 2, md: 4 },
                background: "linear-gradient(180deg,#ffffff,#fffdfb)",
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a payment method to complete your order.
                  </Typography>
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    p: 1,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                    background: "rgba(255,77,77,0.04)",
                  }}
                >
                  <Chip
                    icon={<CreditCardIcon />}
                    label="Secure checkout"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    icon={<ReceiptLongIcon />}
                    label="GST invoice available"
                    variant="outlined"
                  />
                </Paper>

                <Divider />

                <RadioGroup
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <Stack spacing={2}>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <CreditCardIcon />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              Credit / Debit / ATM Card
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Visa, Mastercard, Rupay, Maestro
                            </Typography>
                          </Box>
                        </Stack>
                      }
                    />

                    {/* Card form (show when method === 'card') */}
                    {method === "card" && (
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: 2,
                          p: 2,
                          background: "rgba(0,0,0,0.03)",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Name on card"
                              size="small"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Card number"
                              placeholder="1234 5678 9012 3456"
                              size="small"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label="Expiry (MM/YY)"
                              size="small"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label="CVV"
                              size="small"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{ borderRadius: 2 }}
                              onClick={() => {
                                // example "Save card" UI only
                                // do nothing here (UI-only)
                              }}
                            >
                              Save this card
                            </Button>
                          </Grid>

                          <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="caption" color="text.secondary">
                              Payments are secured and encrypted.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    )}

                    <FormControlLabel
                      value="upi"
                      control={<Radio />}
                      label={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <AccountBalanceWalletIcon />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              UPI (UPI ID / QR)
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Google Pay, PhonePe, Paytm, BHIM
                            </Typography>
                          </Box>
                        </Stack>
                      }
                    />

                    {/* UPI form */}
                    {method === "upi" && (
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: 2,
                          p: 2,
                          background: "rgba(0,0,0,0.03)",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <TextField
                              fullWidth
                              label="Enter UPI ID (example@upi)"
                              size="small"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{ height: "100%", borderRadius: 2 }}
                            >
                              Pay via UPI
                            </Button>
                          </Grid>

                          <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Typography variant="caption" color="text.secondary">
                              Or scan QR at checkout
                            </Typography>
                            <Box mt={1} display="flex" justifyContent="center">
                              <Avatar
                                variant="square"
                                sx={{ width: 110, height: 110, bgcolor: "#fff" }}
                              >
                                <QrCodeScannerIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                              </Avatar>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    )}

                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <LocalAtmIcon />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              Cash on Delivery
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Pay with cash when the order is delivered
                            </Typography>
                          </Box>
                        </Stack>
                      }
                    />
                  </Stack>
                </RadioGroup>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Delivery Instructions
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g., Leave at door, Call on arrival..."
                    size="small"
                    multiline
                    minRows={2}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}>
                  <Button variant="text" onClick={() => navigate(-1)}>
                    Back to cart
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    endIcon={<ArrowForwardIosIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      background: "linear-gradient(135deg,#ff4d4d,#ff8a65)",
                      boxShadow: "0 10px 25px rgba(255,77,77,0.15)",
                    }}
                  >
                    Place Order • ₹{grandTotal}
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT: Order summary */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={6}
              sx={{
                borderRadius: 3,
                p: { xs: 2, md: 3 },
                background: "linear-gradient(180deg,#fff,#fffdfb)",
                position: { md: "sticky" },
                top: { md: 96 },
              }}
            >
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Order Summary
                  </Typography>
                  <Chip label={`${cartItems.length} items`} color="default" />
                </Box>

                <Divider />

                <Stack spacing={1}>
                  {cartItems.length === 0 ? (
                    <Box textAlign="center" py={4}>
                      <Typography variant="body2" color="text.secondary">
                        No items in cart — add delicious dishes to continue.
                      </Typography>
                    </Box>
                  ) : (
                    cartItems.map((it) => (
                      <Box key={it.id || `${it.name}-${Math.random()}`} display="flex" alignItems="center" justifyContent="space-between" py={1}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            variant="rounded"
                            src={it.image}
                            alt={it.name}
                            sx={{ width: 56, height: 56, borderRadius: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {it.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {it.qty} × ₹{it.price}
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          ₹{(it.price || 0) * (it.qty || 1)}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Stack>

                <Divider />

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">₹{subtotal}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Delivery fee</Typography>
                    <Typography variant="body2">₹{deliveryFee}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Taxes & charges</Typography>
                    <Typography variant="body2">₹{taxes}</Typography>
                  </Stack>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    ₹{grandTotal}
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    By placing the order you agree to our Terms & Conditions and Privacy Policy.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentPage;
