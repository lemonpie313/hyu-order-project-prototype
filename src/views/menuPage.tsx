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

import { menuData } from "../data/menu.ts";

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
            <Typography variant="subtitle1">가평휴게소 서울방향</Typography>
          </Box>

          {/* 검색창 */}
          <Box sx={{ px: 2, py: 1 }}>
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
        </Box>
        {/* 카테고리 탭 */}
        <Box sx={{ backgroundColor: "white" }}>
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
        </Box>
      </Box>

      <Box
        sx={{
          width: 500, // 앱 느낌 너비 제한
          overflow: "hidden",
          minHeight: "100vh",
          mt: 25,
        }}
      >
        {/* 메뉴 리스트 */}
        <Box>
          {Object.entries(menuData).map(
            ([category, items], catIdx, catArray) => (
              <Box key={category}>
                <Typography fontWeight="bold" sx={{ m: 2 }}>
                  {category}
                </Typography>

                <Stack spacing={1}>
                  {items.map((item, idx) => {
                    const isLastCategory = catIdx === catArray.length - 1;
                    const isLastItem = idx === items.length - 1;
                    return (
                      <Box key={item.name}>
                        <Typography sx={{ ml: 2, mr: 2 }}>
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{ ml: 2, mr: 2 }}
                          color="text.secondary"
                        >
                          {item.price.toLocaleString()}원
                        </Typography>
                        {idx !== items.length - 1 && (
                          <Divider
                            sx={{
                              mt: 2,
                              mb: 1,
                              ml: 2,
                              mr: 2,
                            }}
                          />
                        )}
                        {isLastItem && isLastCategory && (
                          <Box sx={{ height: 20 }} />
                        )}
                      </Box>
                    );
                  })}
                </Stack>
                <Divider
                  sx={{
                    my: 2,
                    borderBottomWidth: 5,
                  }}
                />
              </Box>
            )
          )}
          ;
        </Box>
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
