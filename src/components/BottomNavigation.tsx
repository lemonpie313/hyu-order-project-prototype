import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import home from "../assets/icons/home.png";
import search from "../assets/icons/search.png";
import orders from "../assets/icons/orders.png";
import my from "../assets/icons/my.png";

const BottomNavigation = () => {
  const navigate = useNavigate(); // ✅ 훅 사용

  const menuItems = [
    { src: home, label: "홈", path: "/main" },
    { src: search, label: "검색", path: "/search" },
    { src: orders, label: "주문내역", path: "/order-list" },
    { src: my, label: "마이", path: "/my" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        borderTop: "1px solid #ddd",
        backgroundColor: "#097969",
        pt: 2,
        pl: 7,
        pr: 7,
        pb: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        maxWidth: 500,
      }}
    >
      {menuItems.map((item, index) => (
        <Box
          key={index}
          onClick={() => navigate(item.path)} // ✅ 경로 이동
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer", // ✅ 클릭 가능 표시
          }}
        >
          <Box
            component="img"
            src={item.src}
            alt={item.label}
            sx={{ width: 40, aspectRatio: "1 / 1" }}
          />
          <Typography
            color="text.secondary"
            sx={{ fontSize: "14px", color: "white" }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BottomNavigation;
