import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./views/mainPage.tsx";
import Menu from "./views/menuPage.tsx";
import Cart from "./views/cartPage.tsx";

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
          <Route path="/main" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
