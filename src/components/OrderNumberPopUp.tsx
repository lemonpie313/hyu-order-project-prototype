import { Box, Button, Typography, Paper, Stack } from "@mui/material";

interface PopupProps {
  open: boolean;
  onConfirm: () => void;
  orderData: any;
}

const OrderNumberPopup = ({ open, onConfirm, orderData }: PopupProps) => {
  if (!open) return null; // 열려있지 않으면 안 보이게
  console.log(orderData);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          width: 320,
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {(
            orderData.items as {
              menuName: string;
              quantity: number;
              price: number;
            }[]
          ).map((menu, index) => {
            const randomOrderNumber = Math.floor(1000 + Math.random() * 9000);
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  px: 2,
                  py: 1,
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Typography>{menu.menuName}</Typography>
                <Typography>{randomOrderNumber}</Typography>
              </Box>
            );
          })}
        </Box>

        <Button
          variant="contained"
          sx={{ bgcolor: "#00796b", "&:hover": { bgcolor: "#00695c" }, mt: 3 }}
          onClick={onConfirm}
        >
          확인
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderNumberPopup;
