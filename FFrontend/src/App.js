// App.js
import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./pages/CartContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PaymentPage from "./pages/PaymentPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ff4d4d" },
    secondary: { main: "#ffb74d" },
    background: {
      default: "#fff7f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#5f5f5f",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: `"Poppins","Roboto","Helvetica","Arial",sans-serif`,
    h2: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="SignUp" element={<SignUp/>}/>
              <Route path="SignIn" element={<SignIn/>}/>
              <Route path="PaymentPage" element={<PaymentPage/>}/>
              {/* future: <Route path="explore" element={<ExplorePage />} /> */}
            </Route>
          </Routes>
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
