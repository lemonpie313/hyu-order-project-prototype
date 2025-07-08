import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { restAreas } from "../data/restAreas";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: string;
  restAreaId: string;
  createdAt: string;
  status: string;
  items: { id: string; menuName: string; quantity: number; price: number }[];
}

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedOrders = localStorage.getItem("order");
    if (storedOrders) {
      const parsedOrders: OrderItem[] = JSON.parse(storedOrders);

      const sortedOrders = parsedOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    }
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.items.some((item) => item.menuName.includes(search))
  );

  const findRestAreaName = (id: number) => {
    return restAreas.find((restArea) => restArea.restAreaId === id);
  };

  const moveToOrderHistory = (id: string) => {
    const storedOrders = localStorage.getItem("order");

    if (storedOrders) {
      const parsedOrders: OrderItem[] = JSON.parse(storedOrders);
      const orderHistory = parsedOrders.find((order) => order.id === id);
      if (orderHistory?.status == "조리 완료") {
        navigate("../order-history/"+orderHistory?.id);
      } else {
        navigate("../order?orderId=" + orderHistory?.id);
      }
    }
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
      <Box
        sx={{
          width: 500, // 앱 느낌 너비 제한
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            backgroundColor: "#00796b",
            color: "white",
            textAlign: "center",
            py: 2,
            position: "fixed",
            maxWidth: 500,
            width: "100%",
            top: 0,
            zIndex: 10,
          }}
        >
          주문 내역
        </Box>

        <Box
          sx={{
            mt: 10,
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {filteredOrders.map((order) => {
            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            return (
              <Box sx={{ borderRadius: 2, width: "100%" }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body1">
                    {findRestAreaName(Number(order.restAreaId))?.restAreaName ||
                      "휴게소 정보 없음"}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    주문일시: {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    주문상태: {order.status}
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} sx={{ mt: 1 }}>
                      {item.menuName} (₩{item.price}) x {item.quantity}개
                    </Typography>
                  ))}
                  <Typography sx={{ mt: 1 }}>
                    총 주문금액: ₩{totalPrice.toLocaleString()}
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      backgroundColor: "#ffffff",
                      color: "black",
                      borderColor: "#00796b",
                    }}
                    onClick={() => moveToOrderHistory(order.id)}
                  >
                    주문 상세 보기
                  </Button>
                </Box>
                <Divider sx={{ mt: 2, mb: 1, mx: 1 }} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistoryPage;
