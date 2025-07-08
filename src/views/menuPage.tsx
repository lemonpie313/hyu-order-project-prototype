import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Paper,
  InputBase,
  Snackbar,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { restAreas } from "../data/restAreas.ts";
import Category from "../components/Category.tsx";
import SubCategory from "../components/SubCategory.tsx";
import Menu from "../components/Menu.tsx";
import DeleteCartPopup from "../components/DeleteCartPopUp.tsx";
import { category } from "../data/category.ts";

const MenuPage = () => {
  const { restAreaId } = useParams();

  // restAreas에서 id가 일치하는 휴게소 찾기
  const selectedRestArea = restAreas.find(
    (restArea: any) => String(restArea.restAreaId) === restAreaId
  );

  const defaultCategory =
    category.find(
      (item) => Number(item?.category[0]?.id) === Number(restAreaId)
    )?.category[0]?.id || 0;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);

  const restAreaIdNum = Number(restAreaId) || 0;

  const [selectedCategoryId, setSelectedCategoryId] = useState(defaultCategory);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(1);

  const [popupOpen, setPopupOpen] = useState(false); // ✅ 팝업 상태
  const [targetCategoryId, setTargetCategoryId] = useState<number | null>(null);
  const [targetSubCategoryId, setTargetSubCategoryId] = useState<number | null>(
    null
  );

  const restAreaName = selectedRestArea ? selectedRestArea.restAreaName : "";

  type CartItem = {
    quantity: number;
    price: number;
  };

  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  useEffect(() => {
    if (restAreaId !== "") {
      const savedCart = localStorage.getItem(restAreaName);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [selectedRestArea]);

  // 메뉴 추가
  const handleAddToCart = (menuName: string, price: number) => {
    setCart((prev) => {
      const newCart = {
        ...prev,
        [menuName]: {
          quantity: (prev[menuName]?.quantity || 0) + 1,
          price, // 가격도 저장
        },
      };

      localStorage.setItem(restAreaName, JSON.stringify(newCart));
      return newCart;
    });

    setSnackbarOpen(true);
  };

  const handleCategoryChange = (
    newCategoryId: number,
    firstSubCategoryId: number
  ) => {
    const savedCart = localStorage.getItem(restAreaName);
    if (savedCart && savedCart !== "{}") {
      setTargetCategoryId(newCategoryId);
      setTargetSubCategoryId(firstSubCategoryId);
      setPopupOpen(true); // 장바구니 있으면 팝업
    } else {
      setSelectedCategoryId(newCategoryId);
      setSelectedSubCategoryId(firstSubCategoryId);
    }
  };

  const handleConfirm = () => {
    localStorage.setItem(restAreaName, "{}"); // 장바구니 비우기
    setCart({});
    if (targetCategoryId !== null && targetSubCategoryId !== null) {
      setSelectedCategoryId(targetCategoryId);
      setSelectedSubCategoryId(targetSubCategoryId);
    }
    setPopupOpen(false);
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
            <Typography variant="subtitle1">{restAreaName}</Typography>
          </Box>

          {/* 검색창 */}
          {/* <Box sx={{ px: 2, py: 1 }}>
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
          </Box> */}
        </Box>
        {/* 카테고리 탭 */}
        <Category
          restAreaId={restAreaIdNum}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={handleCategoryChange}
        />
        <SubCategory
          restAreaId={restAreaIdNum}
          categoryId={selectedCategoryId}
          selectedSubCategoryId={selectedSubCategoryId}
          onSubCategoryChange={(id) => setSelectedSubCategoryId(id)}
        />
      </Box>

      <Box
        sx={{
          width: 500,
          overflow: "hidden",
          minHeight: "100vh",
          mt: 20,
        }}
      >
        {/* 메뉴 리스트 */}
        <Menu
          restAreaId={restAreaIdNum}
          categoryId={selectedCategoryId}
          subCategoryId={selectedSubCategoryId}
          onAddToCart={handleAddToCart}
        />

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
          <Box
            // onClick={() => navigate("/cart")} // 장바구니 페이지로 이동
            sx={{
              color: "white",
              padding: 0,
              minWidth: "auto",
              textTransform: "none", // 버튼 글자 소문자 유지
            }}
          >
            <Typography>
              담긴 메뉴 :{" "}
              {Object.values(cart).reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
              개
            </Typography>
          </Box>
          <Button
            variant="text"
            onClick={() => {
              const totalItems = Object.values(cart).reduce(
                (acc, item) => acc + item.quantity,
                0
              );

              if (totalItems === 0) {
                setAlertOpen(true); // 팝업 띄우기
              } else {
                navigate("/cart"); // 장바구니 페이지로 이동
              }
            }}
            sx={{ color: "white" }}
          >
            주문하기
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000} // 2초 뒤 자동 닫힘 (원하면 조절 가능)
        onClose={() => setSnackbarOpen(false)}
        message="선택하신 메뉴가 추가되었습니다."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10, maxWidth: "calc(100vw - 32px)", width: "100%" }}
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={1000} // 2초 뒤 자동 종료
        onClose={() => setAlertOpen(false)}
        message="메뉴를 먼저 담아주세요."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10, maxWidth: "calc(100vw - 32px)", width: "100%" }}
      />
      <DeleteCartPopup
        open={popupOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        selectedRestArea={restAreaName}
      />
    </Box>
  );
};

export default MenuPage;
