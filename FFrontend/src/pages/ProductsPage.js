// ProductsPage.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Stack,
  Button,
  Rating,
} from "@mui/material";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic cheese pizza with fresh basil.",
    price: 299,
    rating: 4.5,
    tags: ["Veg", "Italian"],
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    eta: "30-40 mins",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Authentic dum biryani with raita.",
    price: 349,
    rating: 4.7,
    tags: ["Non-Veg", "Spicy"],
    image:
      "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=800",
    eta: "35-45 mins",
  },
  {
    id: 3,
    name: "Veg Momos",
    description: "Steamed momos served with spicy chutney.",
    price: 159,
    rating: 4.3,
    tags: ["Veg", "Street Food"],
    image:
      "https://tarasmulticulturaltable.com/wp-content/uploads/2022/02/Veg-Momos-8-of-8.jpg",
    eta: "25-35 mins",
  },
  {
    id: 4,
    name: "Cold Coffee",
    description: "Chilled coffee with ice cream on top.",
    price: 149,
    rating: 4.4,
    tags: ["Beverage"],
    image:
      "https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?auto=compress&cs=tinysrgb&w=800",
    eta: "20-25 mins",
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    addToCart(product);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Order from FoodFusion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Handpicked dishes for your cravings. Tap on “Add to Cart” to start
              your order.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate("/cart")}
            sx={{ borderRadius: 999 }}
          >
            Go to Cart
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {PRODUCTS.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 4,
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-3px)",
                    transition: "0.25s",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={p.image}
                  alt={p.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    {p.name}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 0.5 }}
                  >
                    <Rating
                      value={p.rating}
                      readOnly
                      precision={0.1}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {p.rating}
                    </Typography>
                    <Typography variant="caption">• {p.eta}</Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {p.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {p.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    px: 2,
                    pb: 2,
                    pt: 0,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    ₹{p.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: 999 }}
                    onClick={() => handleAdd(p)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsPage;
