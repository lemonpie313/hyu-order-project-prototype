import { Box, Button, Typography, Paper, Stack } from '@mui/material';

interface PopupProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedRestArea: string;
}

const DeleteCartPopup = ({ open, onConfirm, onCancel, selectedRestArea }: PopupProps) => {
  if (!open) return null; // 열려있지 않으면 안 보이게

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          width: 320,
          maxWidth: '90%',
        }}
      >
        <Typography sx={{ mb: 1 }}>
          다른 매장으로 이동 시 장바구니가 초기화됩니다.
        </Typography>
        <Typography sx={{ mb: 2 }}>
          계속 진행할까요?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{ bgcolor: '#00796b', '&:hover': { bgcolor: '#00695c' } }}
            onClick={onConfirm}
          >
            네
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#00796b', '&:hover': { bgcolor: '#00695c' } }}
            onClick={onCancel}
          >
            아니오
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DeleteCartPopup;
