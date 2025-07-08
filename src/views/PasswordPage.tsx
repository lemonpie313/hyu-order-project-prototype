import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate } from "react-router-dom";

const PasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [shuffledNumbers, setShuffledNumbers] = useState<string[]>([]);
  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword(password + num);
    }
  };

  useEffect(() => {
    if (password.length === 6) {
      const queue = localStorage.getItem("order_queue");
      if (queue) {
        const newOrder = JSON.parse(queue);
        const existingOrders = JSON.parse(
          localStorage.getItem("order") || "[]"
        );

        // 새 주문 추가
        existingOrders.push(newOrder);

        // 다시 저장
        localStorage.setItem("order", JSON.stringify(existingOrders));
        localStorage.removeItem("order_queue");

        localStorage.removeItem("order_queue");
        const order = JSON.parse(queue);
        navigate(`/order?orderId=${order.id}`);
      }
    }
  }, [password, navigate]);

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  useEffect(() => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    const firstNine = shuffled.slice(0, 9);
    const lastNumber = shuffled.slice(9)[0];
    const finalKeys = [...firstNine, "", lastNumber, "del"];
    setShuffledNumbers(finalKeys);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* 타이틀 */}
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>
        결제 시 사용할 비밀번호 입력
      </Typography>

      {/* 비밀번호 입력 동그라미 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "1px solid #ccc",
              backgroundColor:
                password.length > index ? "#00796b" : "transparent",
            }}
          />
        ))}
      </Box>

      {/* 키패드 */}
      <Box
        sx={{
          mt: 10,
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gap: 2,
        }}
      >
        {shuffledNumbers.map((val, idx) => {
          if (val === "") {
            return <Box key={idx} />; // 빈 자리
          }
          if (val === "del") {
            return (
              <Button
                key={idx}
                onClick={handleDelete}
                sx={{
                  color: "#00796b",
                }}
              >
                <BackspaceIcon />
              </Button>
            );
          }
          return (
            <Button
              key={idx}
              onClick={() => handleNumberClick(val)}
              sx={{
                width: 60,
                height: 60,
                color: "#00796b",
                fontSize: "18px",
              }}
            >
              {val}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default PasswordPage;
