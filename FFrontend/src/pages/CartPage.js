// CartPage.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";
const CartPage = () => {
  const { cartItems, updateQty, removeFromCart, clearCart, totals } = useCart();

  return (
    <Box
      sx={{
        py: 4,
        minHeight: "80vh",
        background:
          "radial-gradient(circle at top left,#ffe0e0 0,transparent 50%), radial-gradient(circle at bottom right,#ffe0b2 0,transparent 55%), #fff7f7",
      }}
    >
      <Container maxWidth="lg">
        {/* Page Title */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: { xs: "left", md: "left" },
              }}
            >
              Your Cart
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Review your yummy food items before placing the order.
            </Typography>
          </Box>

          {cartItems.length > 0 && (
            <Chip
              label={`${cartItems.length} item${
                cartItems.length > 1 ? "s" : ""
              } in cart`}
              sx={{
                borderRadius: 999,
                backgroundColor: "rgba(0,0,0,0.04)",
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        {cartItems.length === 0 ? (
          // EMPTY STATE
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              maxWidth: 420,
              mx: "auto",
              p: 3,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: 4,
            }}
          >
            <Avatar
              sx={
                {
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                  background:
                    "linear-gradient(135deg, #ff4d4d 0%, #ffb74d 100%)",
                }
              }
            >
              <ShoppingCartCheckoutIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Add some delicious food items from the menu to see them here.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Tip: Explore products and tap on “Add to cart”.
            </Typography>
          </Box>
        ) : (
          // CART FILLED
          <Grid container spacing={3}>
            {/* Left: items */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 8,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,247,247,0.98) 100%)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background:
                      "linear-gradient(90deg, rgba(255,77,77,0.06), transparent)",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, letterSpacing: 0.3 }}
                  >
                    Items in your cart
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Adjust quantities or remove items
                  </Typography>
                </Box>

                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack spacing={2.5}>
                    {cartItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: { xs: 1.5, sm: 2 },
                            p: 1.5,
                            borderRadius: 3,
                            backgroundColor:
                              index % 2 === 0
                                ? "rgba(0,0,0,0.02)"
                                : "rgba(255,77,77,0.03)",
                          }}
                        >
                          {/* Left side: image + info */}
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                          >
                            <Avatar
                              variant="rounded"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: 70,
                                height: 70,
                                borderRadius: 3,
                                boxShadow: 2,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600 }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                ₹{item.price} x {item.qty}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.3, display: "block" }}
                              >
                                Est. total: ₹{item.price * item.qty}
                              </Typography>
                            </Box>
                          </Stack>

                          {/* Right side: quantity + price + delete */}
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            justifyContent="flex-end"
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 999,
                                backgroundColor: "rgba(255,255,255,0.9)",
                                boxShadow: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  updateQty(item.id, item.qty - 1)
                                }
                                sx={{ p: 0.5 }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography
                                variant="body1"
                                sx={{
                                  minWidth: 24,
                                  textAlign: "center",
                                  fontWeight: 600,
                                }}
                              >
                                {item.qty}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  updateQty(item.id, item.qty + 1)
                                }
                                sx={{ p: 0.5 }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Stack>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                minWidth: 80,
                                textAlign: "right",
                              }}
                            >
                              ₹{item.price * item.qty}
                            </Typography>

                            <IconButton
                              color="error"
                              onClick={() => removeFromCart(item.id)}
                              sx={{
                                backgroundColor: "rgba(244,67,54,0.06)",
                                "&:hover": {
                                  backgroundColor: "rgba(244,67,54,0.15)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>

                        {index !== cartItems.length - 1 && (
                          <Divider sx={{ borderColor: "rgba(0,0,0,0.06)" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Right: summary */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 10,
                  position: { md: "sticky" },
                  top: { md: 96 },
                  overflow: "hidden",
                }}
              >
                {/* Summary Header */}
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    background:
                      "linear-gradient(135deg, #ff4d4d 0%, #ffb74d 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                  >
                    Order Summary
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mt: 0.5 }}
                  >
                    Almost there! 🎉
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5} sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Items total
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ₹{totals.subtotal}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Delivery Fee
                      </Typography>
                      <Typography variant="body2">₹40</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Taxes & charges
                      </Typography>
                      <Typography variant="body2">₹25</Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700 }}
                      >
                        Grand Total
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700 }}
                      >
                        ₹{totals.subtotal + 40 + 25}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={1.5}>
                    <Button
                      variant="contained"
                      fullWidth
                      component={NavLink}
                      to="/Paymentpage"
                      sx={{
                        borderRadius: 999,
                        py: 1.2,
                        fontWeight: 600,
                        boxShadow: 4,
                      }}
                      startIcon={<ShoppingCartCheckoutIcon />}
                    >
                      Place Order
                    </Button>
                    <Button
                      variant="text"
                      fullWidth
                      color="error"
                      onClick={clearCart}
                      sx={{ fontWeight: 500 }}
                    >
                      Clear Cart
                    </Button>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      You can review your order details on the next step.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
