import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Paper,
  Tabs,
  InputBase,
  Tab,
  Snackbar,
} from "@mui/material";

import { restaurantMenuData } from "../data/restaurantMenu.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // 메뉴 추가
  const handleAddToCart = (menuName: string) => {
    setCart((prev) => {
      const newCart = {
        ...prev,
        [menuName]: (prev[menuName] || 0) + 1,
      };

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    });

    setSnackbarOpen(true);
  };

  // 메뉴 수량 감소 or 삭제
  const handleDecrease = (menuName: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[menuName] === 1) {
        delete newCart[menuName];
      } else {
        newCart[menuName] -= 1;
      }
      return newCart;
    });
  };

  // 메뉴 증가
  const handleIncrease = (menuName: string) => {
    setCart((prev) => ({
      ...prev,
      [menuName]: prev[menuName] + 1,
    }));
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 상단 헤더 */}
      <Box
        sx={{
          position: "fixed",
          maxWidth: 500,
          width: "100%",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00796b",
          }}
        >
          <Box
            sx={{
              color: "white",
              textAlign: "center",
              py: 2,
            }}
          >
            <Typography variant="subtitle1">가평휴게소 서울방향</Typography>
          </Box>

          {/* 검색창 */}
          <Box sx={{ px: 2, py: 1 }}>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                px: 1,
                borderRadius: "999px",
              }}
            >
              <Box />
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="검색" />
              <Box />
            </Paper>
          </Box>
        </Box>
        {/* 카테고리 탭 */}
        <Box sx={{ backgroundColor: "white" }}>
          <Tabs
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="식당" />
            <Tab label="스낵바" />
            <Tab label="카페" />
            <Tab label="기타" />
          </Tabs>

          {/* 하위 탭 */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid #ddd",
            }}
          >
            {Object.keys(restaurantMenuData).map((category, idx) => (
              <Button
                key={idx}
                variant={selectedCategory === category ? "outlined" : "text"}
                size="small"
                sx={{
                  borderRadius: "999px",
                  m: 0.5,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  fontSize: 12,
                }}
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === category ? "" : category
                  )
                }
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: 500, // 앱 느낌 너비 제한
          overflow: "hidden",
          minHeight: "100vh",
          mt: 25,
        }}
      >
        {/* 메뉴 리스트 */}
        <Box>
          {selectedCategory === "" ? (
            // 전체 메뉴 출력
            Object.entries(restaurantMenuData).map(([category, items]) => (
              <Box key={category}>
                <Typography fontWeight="bold" sx={{ m: 2 }}>
                  {category}
                </Typography>
                <Stack spacing={1}>
                  {items.map((item, idx, array) => (
                    <Box key={item.name}>
                      <Button
                        disableRipple
                        onClick={() => handleAddToCart(item.name)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          width: "60%",
                          ml: 2,
                        }}
                      >
                        <Typography sx={{ color: "black" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ color: "black" }}>
                          {item.price.toLocaleString()}원
                        </Typography>
                      </Button>
                      {idx !== array.length - 1 && (
                        <Divider sx={{ mt: 2, mb: 1, ml: 2, mr: 2 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
                <Divider
                  sx={{
                    my: 2,
                    borderBottomWidth: 5,
                  }}
                />
              </Box>
            ))
          ) : (
            // 선택한 카테고리 메뉴 출력
            <Box>
              <Typography fontWeight="bold" sx={{ m: 2 }}>
                {selectedCategory}
              </Typography>
              <Stack spacing={1}>
                {restaurantMenuData[selectedCategory].map(
                  (item, idx, array) => (
                    <Box key={item.name}>
                      <Button
                        onClick={() => handleAddToCart(item.name)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          width: "60%",
                          ml: 2,
                        }}
                      >
                        <Typography sx={{ color: "black" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ color: "black" }}>
                          {item.price.toLocaleString()}원
                        </Typography>
                      </Button>
                      {idx !== array.length - 1 && (
                        <Divider sx={{ mt: 2, mb: 1, ml: 2, mr: 2 }} />
                      )}
                    </Box>
                  )
                )}
              </Stack>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 500,
            width: "100%",
            backgroundColor: "#00796b",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
          }}
        >
          <Button
            onClick={() => navigate("/cart")} // 장바구니 페이지로 이동
            sx={{
              color: "white",
              padding: 0,
              minWidth: "auto",
              textTransform: "none", // 버튼 글자 소문자 유지
            }}
          >
            <Typography>
              담긴 메뉴 :{" "}
              {Object.values(cart).reduce((acc, quantity) => acc + quantity, 0)}
              개
            </Typography>
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("/cart")}
            sx={{ color: "white" }}
          >
            주문하기
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // 2초 뒤 자동 닫힘 (원하면 조절 가능)
        onClose={() => setSnackbarOpen(false)}
        message="선택하신 메뉴가 추가되었습니다."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10 }}
      />
    </Box>
  );
};

export default Menu;
