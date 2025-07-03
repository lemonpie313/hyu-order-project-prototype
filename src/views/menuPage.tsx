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
} from "@mui/material";

const Menu = () => {
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
          width: 400, // 앱 느낌 너비 제한
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* 상단 헤더 */}
        <Box
          sx={{
            backgroundColor: "#00796b",
            color: "white",
            textAlign: "center",
            py: 2,
          }}
        >
          <Typography variant="subtitle1">
            가평휴게소 서울방향 프리텐다드
          </Typography>
        </Box>

        {/* 검색창 */}
        <Box sx={{ px: 2, py: 1, backgroundColor: "#00796b" }}>
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

        {/* 카테고리 탭 */}
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
          {["추천", "한식", "분식", "라면·우동", "덮밥"].map((item, idx) => (
            <Button
              key={idx}
              variant={idx === 0 ? "outlined" : "text"}
              size="small"
              sx={{
                borderRadius: "999px",
                m: 0.5,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        {/* 메뉴 리스트 */}
        <Box sx={{ p: 2 }}>
          {/* 추천메뉴 */}
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            추천메뉴
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography>라면</Typography>
              <Typography color="text.secondary">4,500원</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography>제육비빔밥</Typography>
              <Typography color="text.secondary">7,000원</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography>치즈돈까스</Typography>
              <Typography color="text.secondary">8,000원</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography>숯불비빔냉면</Typography>
              <Typography color="text.secondary">8,000원</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* 한식 메뉴 */}
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            한식
          </Typography>
          <Box>
            <Typography>김치찌개</Typography>
            <Typography color="text.secondary">8,000원</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 400,
            backgroundColor: "#00796b",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography>담긴 메뉴 : 2개</Typography>
          <Button variant="text" sx={{ color: "white" }}>
            주문하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
