import {
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

const Main = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        sx={{
          width: 400, // 앱 느낌 너비 제한
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* 지도 (빈 박스) */}
        <Box sx={{ height: 600, backgroundColor: "#ccc" }} />

        {/* 하단 카드 영역 */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            가까운 휴게소
          </Typography>

          <Stack spacing={2}>
            {/* 첫번째 휴게소 */}
            <Box>
              <Typography>가평휴게소 서울방향</Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <Typography color="text.secondary">
                  도착 예정 시간 10:20
                </Typography>
                <Button variant="contained">주문하기</Button>
              </Stack>
            </Box>

            <Divider />

            {/* 두번째 휴게소 */}
            <Box>
              <Typography>가평휴게소 춘천방향</Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <Typography color="text.secondary">
                  도착 예정 시간 10:20
                </Typography>
                <Button variant="contained">주문하기</Button>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* 하단 네비게이션 */}
        <Box sx={{ display: "flex", borderTop: "1px solid #ddd" }}>
          {["전체메뉴", "검색", "홈", "주문내역", "마이"].map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1,
                borderRight: idx !== 4 ? "1px solid #ddd" : "none",
                fontSize: 12,
              }}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
