import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainPage from "./views/MainPage.tsx";
import MenuPage from "./views/MenuPage.tsx";
import CartPage from "./views/CartPage.tsx";
import OrderPage from "./views/OrderPage.tsx";
import PasswordPage from "./views/PasswordPage.tsx";
import OrderListPage from "./views/OrderListPage.tsx";
import OrderHistoryPage from "./views/OrderHisoryPage.tsx";

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
          <Route path="/:restAreaId/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-password" element={<PasswordPage />} />
          <Route path="/order-history/:orderHistoryId" element={<OrderHistoryPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
