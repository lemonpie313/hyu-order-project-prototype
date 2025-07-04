import { Box, Button, Typography, Paper, Stack } from '@mui/material';

interface PopupProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedRestArea: string;
}

const AlarmRestAreaPopup = ({ open, onConfirm, onCancel, selectedRestArea }: PopupProps) => {
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
          휴게소 선택 시 <b>방향</b>에 유의하시기 바랍니다
        </Typography>
        <Typography sx={{ mb: 2 }}>
          선택하신 <b>{selectedRestArea}</b><br />
          음식을 주문하시겠습니까?
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

export default AlarmRestAreaPopup;
