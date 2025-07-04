import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import home from "../assets/icons/home.png";
import my from "../assets/icons/my.png";
import orders from "../assets/icons/orders.png";
import search from "../assets/icons/search.png";
import { restAreas } from "../data/restAreas.ts";
import OrderNumberPopup from "../components/OrderNumberPopUp.tsx";

const steps = ["주문 접수", "조리 중", "조리 완료"];

const OrderPage = () => {
  const [activeStep, setActiveStep] = useState(0); // 처음엔 0
  const [status, setStatus] = useState("주문 확인중");
  const [statusDetail, setStatusDetail] = useState(
    "주문이 확정된 후에는 취소할 수 없습니다. "
  );
  const [showCancelButton, setShowCancelButton] = useState(true);
  const [showDelayButton, setShowDelayButton] = useState(false);
  const [showOrderNumButton, setShowOrderNumButton] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep(1); // 3초 뒤에 1로 변경
      setStatus("조리중");
      setShowCancelButton(false);
      setStatusDetail(
        "입력한 도착예정 시간에 맞춰 조리가 시작됩니다. \n도착예정 시간보다 늦을 경우 미루기 버튼을 눌러주세요. \n미루기 입력이 늦을 경우 조리가 미리 시작될 수도 있습니다. "
      );
      setShowDelayButton(true);
    }, 3000);

    return () => clearTimeout(timer); // 언마운트 시 타이머 정리
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep(2); // 3초 뒤에 1로 변경
      setStatus("조리 완료");
      setStatusDetail(
        "조리가 완료되었습니다.\n가게 픽업대에서 예약번호를 확인하세요."
      );
      setShowDelayButton(false);
      setShowOrderNumButton(true);
    }, 10000);

    return () => clearTimeout(timer); // 언마운트 시 타이머 정리
  }, []);

  const storedOrder = localStorage.getItem("order");
  const orderData = storedOrder ? JSON.parse(storedOrder) : null;
  const restAreaId = orderData?.restAreaId;
  const restAreaName =
    restAreas.find((area) => String(area.restAreaId) === String(restAreaId))
      ?.restAreaName || "휴게소 정보 없음";

  const handleClose = () => {
    setPopupOpen(false);
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
          background: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* 지도 (빈 박스) */}
        <Box
          sx={{
            width: "100%",
            py: 2,
          }}
        />

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* 그니까 여기 */}
          <Box
            sx={{
              backgroundColor: "white",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
              p: 3,
            }}
          >
            {/* 휴게소 이름 */}
            <Typography variant="h6" fontWeight="bold">
              {restAreaName}
            </Typography>

            {/* 주문 진행 상태 */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* 주문 상태 문구 */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" fontWeight="bold">
                  {status}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 1, fontSize: "10pt", whiteSpace: "pre-wrap" }}
                >
                  {statusDetail}
                </Typography>
              </Box>

              {/* 취소 버튼 */}
              {showCancelButton && ( // 버튼 보일 때만 렌더링
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    mt: 2,
                    border: "none",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    color: "black",
                    borderRadius: 0,
                    backgroundColor: "white",
                    fontSize: "10pt",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  취소하기
                </Button>
              )}
            </Box>
            {showDelayButton && (
              <Button
                sx={{
                  mt: 2,
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  color: "black",
                  borderRadius: 0,
                  backgroundColor: "white",
                  fontSize: "10pt",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                10분 미루기
              </Button>
            )}
            {showOrderNumButton && (
              <Button
                onClick={() => {
                  setPopupOpen(true)
                }}
                sx={{
                  mt: 2,
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  color: "black",
                  borderRadius: 0,
                  backgroundColor: "white",
                  fontSize: "10pt",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                주문번호 확인하기
              </Button>
            )}
          </Box>
          {/* 하단 네비게이션 */}
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={home}
                alt=".."
                sx={{ width: 40, aspectRatio: "1 / 1" }}
              />
              <Typography
                color="text.secondary"
                sx={{ fontSize: "14px", color: "white" }}
              >
                홈
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={search}
                alt=".."
                sx={{ width: 40, aspectRatio: "1 / 1" }}
              />
              <Typography
                color="text.secondary"
                sx={{ fontSize: "14px", color: "white" }}
              >
                검색
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={orders}
                alt=".."
                sx={{ width: 40, aspectRatio: "1 / 1" }}
              />
              <Typography
                color="text.secondary"
                sx={{ fontSize: "14px", color: "white" }}
              >
                주문내역
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={my}
                alt=".."
                sx={{ width: 40, aspectRatio: "1 / 1" }}
              />
              <Typography
                color="text.secondary"
                sx={{ fontSize: "14px", color: "white" }}
              >
                마이
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* 팝업 */}
      <OrderNumberPopup
        open={popupOpen}
        onConfirm={handleClose}
        orderData={orderData}
      />
    </Box>
  );
};

export default OrderPage;
