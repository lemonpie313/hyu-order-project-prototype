import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TrashCanIcon from "../assets/icons/trashcan.png";
import MinusIcon from "../assets/icons/minus.png";
import PlusIcon from "../assets/icons/plus.png";
import SetQuantity from "../components/SetQuantity.tsx";
import { restAreas } from "../data/restAreas.ts";

const CartPage = () => {
  const navigate = useNavigate();

  type CartItem = {
    quantity: number;
    price: number;
  };

  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  const selectedRestAreaId = localStorage.getItem("selectedRestArea");
  const selectedRestArea = restAreas.find(
    (area) => String(area.restAreaId) === selectedRestAreaId
  )?.restAreaName;
  const restAreaName = selectedRestArea ? selectedRestArea : "휴게소 선택 안됨";

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const savedCart = localStorage.getItem(restAreaName);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [restAreaName]);

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
          justifyContent: "space-between",
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
          <Typography variant="subtitle1">
            {restAreaName || "휴게소 선택 안됨"}
          </Typography>
        </Box>

        {/* 매장/포장 선택 */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" sx={{ borderRadius: "999px" }}>
            매장
          </Button>
          <Button variant="outlined" sx={{ borderRadius: "999px" }}>
            포장
          </Button>
        </Box>

        {/* 도착 시간 입력 */}
        <Box sx={{ px: 2, mt: 3 }}>
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            휴게소 도착 시간 입력
          </Typography>
          <TextField
            fullWidth
            placeholder="자동 입력하기"
            value="도착 예정 시간 10:20"
            InputProps={{ readOnly: true }}
          />
          <TextField fullWidth placeholder="직접 입력하기" sx={{ mt: 2 }} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 주문 메뉴 */}
        <Box sx={{ px: 2 }}>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            주문메뉴
          </Typography>
          {Object.entries(cart).map(([menu, item]) => (
            <Box
              key={menu}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography>{menu}</Typography>
                <Typography color="text.secondary">{`${8000}원`}</Typography>
              </Box>
              {/* 여기도 가격 연동 필요 */}
              <SetQuantity
                menu={menu}
                quantity={item.quantity}
                price={item.price}
                cart={cart}
                selectedRestArea={restAreaName}
                setCart={setCart}
              />
            </Box>
          ))}
          <Typography
            color="primary"
            sx={{ textAlign: "center", cursor: "pointer" }}
          >
            + 메뉴 추가
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 결제 금액 */}
        <Box sx={{ px: 2 }}>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            결제금액
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">주문금액</Typography>
            <Typography>{`${totalPrice.toLocaleString()}원`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography color="text.secondary">할인</Typography>
            <Button size="small" variant="outlined">
              쿠폰
            </Button>
            <Typography>0원</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>총 결제금액</Typography>
            <Typography>{`${totalPrice.toLocaleString()}원`}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 결제 방법 (비워둠) */}
        <Box sx={{ px: 2 }}>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            결제 방법
          </Typography>
        </Box>

        {/* 주문하기 버튼 */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            position: "fixed",
            maxWidth: 500,
            width: "100%",
            bottom: 0,
            borderRadius: 0,
          }}
        >
          주문하기
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
