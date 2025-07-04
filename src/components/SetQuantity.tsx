import { Box, IconButton, Typography } from "@mui/material";
import TrashCanIcon from "../assets/icons/trashcan.png";
import MinusIcon from "../assets/icons/minus.png";
import PlusIcon from "../assets/icons/plus.png";

interface SetQuantityProps {
  menu: string;
  quantity: number;
  price: number;
  cart: { [key: string]: { quantity: number; price: number } };
  selectedRestArea: string;
  setCart: React.Dispatch<
    React.SetStateAction<{ [key: string]: { quantity: number; price: number } }>
  >;
}

const SetQuantity = ({
  menu,
  quantity,
  price,
  cart,
  selectedRestArea,
  setCart,
}: SetQuantityProps) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      const updatedCart = {
        ...cart,
        [menu]: { ...cart[menu], quantity: quantity - 1 },
      };
      setCart(updatedCart);
      localStorage.setItem(selectedRestArea, JSON.stringify(updatedCart));
    } else {
      const updatedCart = { ...cart };
      delete updatedCart[menu];
      setCart(updatedCart);
      localStorage.setItem(selectedRestArea, JSON.stringify(updatedCart));
    }
  };

  const handleIncrease = () => {
    const updatedCart = {
      ...cart,
      [menu]: { ...cart[menu], quantity: quantity + 1 },
    };
    setCart(updatedCart);
    localStorage.setItem(selectedRestArea, JSON.stringify(updatedCart));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "999px",
        backgroundColor: "#00796b",
        color: "white",
        px: 1.5,
        py: 0.5,
        width: "fit-content",
        mt: 1,
        gap: 1,
      }}
    >
      <IconButton size="small" sx={{ color: "white" }} onClick={handleDecrease}>
        <img
          src={quantity > 1 ? MinusIcon : TrashCanIcon}
          alt={quantity > 1 ? "minus" : "trash"}
          style={{ width: 16, height: 16 }}
        />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton size="small" sx={{ color: "white" }} onClick={handleIncrease}>
        <img src={PlusIcon} alt="plus" style={{ width: 16, height: 16 }} />
      </IconButton>
    </Box>
  );
};

export default SetQuantity;
