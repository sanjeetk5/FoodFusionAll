// HomePage.jsx
import React from "react";
import {
  Box,
  Container,
  Stack,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Divider,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "#fff7f7", minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: { xs: "70vh", md: "75vh" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, #ffe0e0 0, transparent 50%), radial-gradient(circle at bottom right, #ffe0b2 0, transparent 55%), #fff7f7",
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 8 },
        }}
      >
        {/* Decorative blobs */}
        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,77,77,0.12)",
            top: -40,
            right: -40,
            filter: "blur(2px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,183,77,0.16)",
            bottom: -60,
            left: -40,
            filter: "blur(2px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={6}
            alignItems="center"
            direction={{ xs: "column-reverse", md: "row" }}
          >
            {/* Left - Text and Search */}
            <Grid item xs={12} md={7}>
              <Stack spacing={3} alignItems={{ xs: "center", md: "flex-start" }}>
                <Box textAlign={{ xs: "center", md: "left" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.1,
                      fontSize: { xs: 32, sm: 40, md: 48 },
                    }}
                  >
                    Discover the best food & drinks
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      maxWidth: 520,
                      mx: { xs: "auto", md: 0 },
                      fontSize: { xs: 14, sm: 16 },
                    }}
                  >
                    Explore curated lists of restaurants, cafes, and street food
                    in your city based on trends, ratings, and cravings.
                  </Typography>
                </Box>

                {/* Search Bar */}
                <Paper
                  elevation={4}
                  sx={{
                    p: { xs: 2, sm: 1.5 },
                    borderRadius: { xs: 3, sm: 999 },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: { xs: 1.5, sm: 1 },
                    width: { xs: "100%", md: "90%" },
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="Bengaluru"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    sx={{
                      minWidth: { xs: "100%", sm: 140 },
                      "& .MuiInputBase-root": { fontSize: 14 },
                    }}
                  />

                  <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={{
                      mx: { sm: 1 },
                      my: { xs: 1, sm: 0 },
                      borderColor: "rgba(0,0,0,0.1)",
                    }}
                  />

                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="Search for restaurant, cuisine or a dish"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    sx={{
                      "& .MuiInputBase-root": { fontSize: 14 },
                    }}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      px: { xs: 2, sm: 3 },
                      height: { xs: 40, sm: 44 },
                      width: { xs: "100%", sm: "auto" },
                      mt: { xs: 1, sm: 0 },
                    }}
                  >
                    Search
                  </Button>
                </Paper>

                {/* Popular tags */}
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Popular:
                  </Typography>
                  {["Pizza", "Biryani", "Burger", "Desserts", "Cafe"].map(
                    (item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                          borderRadius: 999,
                          backgroundColor: "rgba(0,0,0,0.04)",
                          mb: 0.5,
                        }}
                      />
                    )
                  )}
                </Stack>
              </Stack>
            </Grid>

            {/* Right - Food collage */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  mb: { xs: 3, md: 0 },
                }}
              >
                {/* Big card */}
                <Card
                  sx={{
                    width: { xs: 260, sm: 280 },
                    borderRadius: 6,
                    overflow: "hidden",
                    boxShadow: 6,
                    transform: { xs: "rotate(-2deg)", md: "rotate(-4deg)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="260"
                    image="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Food"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Midnight cravings?
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                      <StarIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2">
                        4.5 · 32 min · ₹200 for one
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Small overlay card 1 */}
                <Card
                  sx={{
                    position: "absolute",
                    top: { xs: 8, sm: 16 },
                    right: { xs: -4, sm: -12 },
                    width: 150,
                    borderRadius: 4,
                    boxShadow: 4,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="110"
                    image="https://images.pexels.com/photos/1438675/pexels-photo-1438675.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Dessert"
                  />
                  <CardContent sx={{ py: 1.5 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Sweet Tooth
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Desserts · Ice Creams
                    </Typography>
                  </CardContent>
                </Card>

                {/* Small overlay card 2 */}
                <Paper
                  elevation={4}
                  sx={{
                    position: "absolute",
                    bottom: { xs: 8, sm: 16 },
                    left: { xs: -4, sm: -10 },
                    borderRadius: 999,
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: "#ffffffdd",
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28 }}>
                    <FavoriteIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      1500+ options
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Loved by foodies near you
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ORDER OPTIONS */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={3}>
          {[
            {
              title: "Order Online",
              subtitle: "Stay in and order to your doorstep",
              icon: <DeliveryDiningIcon />,
              image:
                "https://images.pexels.com/photos/4393665/pexels-photo-4393665.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
            {
              title: "Dining Out",
              subtitle: "Explore curated places to dine out",
              icon: <RestaurantMenuIcon />,
              image:
                "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
            {
              title: "Cafes & More",
              subtitle: "Perfect spots for coffee & conversations",
              icon: <LocalCafeIcon />,
              image:
                "https://images.pexels.com/photos/373095/pexels-photo-373095.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={card.image}
                    alt={card.title}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent 55%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      right: 16,
                      color: "#fff",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        {card.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight={600}>
                        {card.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* COLLECTIONS */}
      <Box sx={{ backgroundColor: "#fff", py: 6 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, fontSize: { xs: 24, md: 32 } }}
              >
                Collections
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1, fontSize: { xs: 14, md: 16 } }}
              >
                Explore curated lists of top restaurants, cafes, pubs, and bars.
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {[
              {
                title: "Newly Opened Places",
                count: "15 Places",
                img: "https://b.zmtcdn.com/data/collections/26663d5efa377704a8783795f32b6167_1727170993.png",
              },
              {
                title: "Trending This Week",
                count: "32 Places",
                img: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
              },
              {
                title: "Legendary Biryani Spots",
                count: "20 Places",
                img: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=800",
              },
              {
                title: "Romantic Dinner",
                count: "18 Places",
                img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
              },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Card
                  sx={{
                    position: "relative",
                    height: 220,
                    borderRadius: 4,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: 4,
                    "&:hover": {
                      transform: "translateY(-4px)",
                      transition: "all 0.35s ease",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={item.img}
                    alt={item.title}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), transparent 55%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      right: 16,
                      color: "#fff",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {item.count}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: 22, md: 28 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          How it works
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              step: "1",
              title: "Choose location",
              desc: "Select your city and area to find the best food around you.",
            },
            {
              step: "2",
              title: "Discover places",
              desc: "Browse top-rated restaurants, cafes, and hidden gems.",
            },
            {
              step: "3",
              title: "Order or book",
              desc: "Order online or reserve a table in just a few taps.",
            },
          ].map((item) => (
            <Grid item xs={12} md={4} key={item.step}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  textAlign: { xs: "center", md: "left" },
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    fontSize: 18,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #ff4d4d 0%, #ffb74d 100%)",
                  }}
                >
                  {item.step}
                </Avatar>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box sx={{ backgroundColor: "#111", color: "#f5f5f5", py: 4, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #ff4d4d 0%, #ff8a65 100%)",
                  }}
                />
                <Typography variant="h6" fontWeight={700}>
                  FoodFusion
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.7)"
                textAlign={{ xs: "center", md: "left" }}
              >
                Discover the best food & drinks in your city. Crafted for food
                lovers, explorers, and late-night snackers.
              </Typography>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={1}
                textAlign={{ xs: "center", md: "left" }}
              >
                About
              </Typography>
              <Stack
                spacing={0.5}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Typography variant="body2">Who we are</Typography>
                <Typography variant="body2">Blog</Typography>
                <Typography variant="body2">Careers</Typography>
                <Typography variant="body2">Report fraud</Typography>
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={1}
                textAlign={{ xs: "center", md: "left" }}
              >
                For restaurants
              </Typography>
              <Stack
                spacing={0.5}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Typography variant="body2">Partner with us</Typography>
                <Typography variant="body2">Apps for you</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={1}
                textAlign={{ xs: "center", md: "left" }}
              >
                Get the app
              </Typography>
              <Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderRadius: 3,
                    backgroundColor: "#000",
                    width: { xs: "80%", sm: "60%", md: "auto" },
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="rgba(255,255,255,0.7)"
                    >
                      GET IT ON
                    </Typography>
                    <Typography variant="body1">Google Play</Typography>
                  </Box>
                </Paper>
                <Paper
                  sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderRadius: 3,
                    backgroundColor: "#000",
                    width: { xs: "80%", sm: "60%", md: "auto" },
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="rgba(255,255,255,0.7)"
                    >
                      Download on the
                    </Typography>
                    <Typography variant="body1">App Store</Typography>
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

          <Typography
            variant="caption"
            color="rgba(255,255,255,0.6)"
            textAlign="center"
            display="block"
          >
            © {new Date().getFullYear()} FoodFusion. Inspired by Zomato UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
