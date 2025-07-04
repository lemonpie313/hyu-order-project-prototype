import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainPage from "./views/mainPage.tsx";
import MenuPage from "./views/menuPage.tsx";
import CartPage from "./views/cartPage.tsx";
import OrderPage from "./views/orderPage.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard Variable",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/:restAreaId/menu/:categoryId" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
