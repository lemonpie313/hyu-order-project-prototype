import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  BottomNavigation,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { restAreas } from "../data/restAreas";

const OrderHistoryPage = () => {
  const { orderHistoryId } = useParams<{ orderHistoryId: string }>();

  const orderHistory = JSON.parse(localStorage.getItem("order") || "[]") as {
    restAreaId: string;
    id: string;
    createdAt: string;
    status: string;
    paymentMethod: string;
    paymentCardNum: string;
    items: { id: string; menuName: string; quantity: number; price: number }[];
  }[];

  const order = orderHistory.find((order) => order.id === orderHistoryId);
  const restAreaName = restAreas.find(
    (restArea) => Number(restArea.restAreaId) === Number(order?.restAreaId)
  )?.restAreaName;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  if (!order) {
    return (
      <Box p={2}>
        <Typography>주문 내역을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

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
          width: 500,
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
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
          <Typography variant="subtitle1">주문 상세 내역</Typography>
        </Box>
        <Box sx={{ px: 2, pt: 8, mt: 5 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "16pt", mb: 2 }}
          >
            {order.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            주문 일시: {formatDate(order.createdAt)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            주문 아이디: {order.id}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            {restAreaName}
          </Typography>

          <Card variant="outlined">
            <CardContent>
              <List>
                {order.items.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={item.menuName}
                      secondary={`수량: ${item.quantity}개 / 금액: ${item.price.toLocaleString()}원`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Typography variant="subtitle1">총 결제 금액</Typography>
            <Typography variant="subtitle1">
              {order.items
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString()}
              원
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            결제수단: {order.paymentMethod} {order.paymentCardNum}
          </Typography>

          {order.status === "만료됨" && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                만료 사유: 미픽업
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default OrderHistoryPage;
