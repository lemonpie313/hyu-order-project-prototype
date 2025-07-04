import { Typography, Box, Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmRestAreaPopup from "../components/AlarmRestAreaPopUp.tsx";
import cafe from "../assets/icons/cafe.png";
import food from "../assets/icons/food.png";
import gas from "../assets/icons/gas.png";
import restroom from "../assets/icons/restroom.png";
import home from "../assets/icons/home.png";
import my from "../assets/icons/my.png";
import orders from "../assets/icons/orders.png";
import search from "../assets/icons/search.png";
import { restAreas } from "../data/restAreas.ts";

const MainPage = () => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRestArea, setSelectedRestArea] = useState("");
  const [selectedRestAreaId, setSelectedRestAreaId] = useState(0);

  const handleOrder = (restArea: string, restAreaId: number) => {
    setSelectedRestArea(restArea);
    setSelectedRestAreaId(restAreaId);
    setPopupOpen(true);
  };

  const icons = [cafe, food, gas, restroom]

  const handleConfirm = () => {
    setPopupOpen(false);
    localStorage.setItem("selectedRestArea", String(selectedRestAreaId));
    localStorage.setItem(selectedRestArea, "{}");
    const categoryId = restAreas.find((area) => area.restAreaId == 1)?.defaultCategoryId
    navigate(`/${selectedRestAreaId}/menu/${categoryId}`);
  };

  const handleCancel = () => {
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
          {/* 하단 카드 영역 */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={700}>
                가까운 휴게소
              </Typography>
            </Box>

            <Stack spacing={2}>
              {restAreas.map((area) => (
                <Box
                  key={area.restAreaId}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={16} fontWeight={500}>
                      {area.restAreaName}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      {icons.map((src, idx) => (
                        <Box
                          key={idx}
                          component="img"
                          src={src}
                          alt="icon"
                          sx={{ width: 30, aspectRatio: "1 / 1" }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleOrder(area.restAreaName, area.restAreaId)}
                      sx={{
                        width: "100%",
                        borderRadius: 0,
                        backgroundColor: "#097969",
                      }}
                    >
                      주문하기
                    </Button>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "14px" }}
                    >
                      도착 예정 시간 10:20
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
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
      <AlarmRestAreaPopup
        open={popupOpen}
        selectedRestArea={selectedRestArea}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default MainPage;
