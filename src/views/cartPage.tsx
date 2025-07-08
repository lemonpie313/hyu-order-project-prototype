import { Box, Button, Divider, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SetQuantity from "../components/SetQuantity.tsx";
import { restAreas } from "../data/restAreas.ts";

const CartPage = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string>("농협 카드");

  type CartItem = {
    quantity: number;
    price: number;
  };

  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  const [selectedOption, setSelectedOption] = useState<"매장" | "포장">("매장");

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

  const categoryId = restAreas.find(
    (area) => area.restAreaId == 1
  )?.defaultCategoryId;

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
          justifyContent: "flex-start",
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 10 }}>
          <Button
            variant={selectedOption === "매장" ? "contained" : "outlined"}
            onClick={() => setSelectedOption("매장")}
            sx={{ borderRadius: "999px" }}
          >
            매장
          </Button>
          <Button
            variant={selectedOption === "포장" ? "contained" : "outlined"}
            onClick={() => setSelectedOption("포장")}
            sx={{ borderRadius: "999px" }}
          >
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
                <Typography color="text.secondary">{`${item.price}원`}</Typography>
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
            onClick={() =>
              navigate(`../${selectedRestAreaId}/menu/${categoryId}`)
            }
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
        <Box sx={{ px: 2, mb: 10 }}>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            결제 방법
          </Typography>
          {/* 카드 결제 선택 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <input type="radio" name="paymentMethod" id="card" defaultChecked />
            <Typography sx={{ ml: 1 }}>카드 결제</Typography>
          </Box>

          {/* 카드 목록 */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              overflowX: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "max-content",
              }}
            >
              {["농협 카드", "신한 카드"].map((key) => (
                <Box
                  key={key}
                  onClick={() => setSelectedCard(key)}
                  sx={{
                    backgroundColor: "#eee",
                    borderRadius: 1,
                    padding: 2,
                    width: 168,
                    textAlign: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    border:
                      selectedCard === key
                        ? "3px solid #00796b"
                        : "2px solid transparent",
                    transition: "border 0.3s ease",
                  }}
                >
                  <>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {key}
                    </Typography>
                    <Typography variant="caption">
                      1234 **** 5678 ****
                    </Typography>
                  </>
                </Box>
              ))}

              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 1,
                  padding: 2,
                  width: 168,
                  textAlign: "center",
                  color: "#999",
                  cursor: "pointer",
                }}
              >
                <Typography sx={{ fontSize: "20px", mb: 1 }}>+</Typography>
                <Typography variant="caption">카드 추가 등록</Typography>
              </Box>
            </Box>
          </Box>

          {/* 다른 결제 수단 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input type="radio" name="paymentMethod" id="other" />
            <Typography sx={{ ml: 1 }}>다른 결제 수단</Typography>
          </Box>
        </Box>

        {/* 주문하기 버튼 */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            const orderData = {
              restAreaId: selectedRestAreaId,
              id: crypto.randomUUID(), // 고유 ID
              createdAt: new Date().toISOString(), // 생성 시간 (ISO 포맷)
              status: "주문 확인중",
              paymentMethod: selectedCard,
              paymentCardNum: "1234-****-5678-****",
              items: Object.entries(cart).map(([menuName, item]) => ({
                id: crypto.randomUUID(), // 고유 ID
                menuName,
                quantity: item.quantity,
                price: item.price,
              })),
            };
            localStorage.setItem("order_queue", JSON.stringify(orderData));
            navigate("../order-password");
          }}
          sx={{
            position: "fixed",
            maxWidth: 500,
            width: "100%",
            bottom: 0,
            borderRadius: 0,
            height: 50,
            backgroundColor: "#00796b",
          }}
        >
          주문하기
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
