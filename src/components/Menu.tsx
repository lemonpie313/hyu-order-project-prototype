import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { restAreaMenu_1_1 } from "../data/restAreaMenu_1_1.ts";
import { restAreaMenu_1_2 } from "../data/restAreaMenu_1_2.ts";
import { restAreaMenu_1_3 } from "../data/restAreaMenu_1_3.ts";
import { restAreaMenu_2_1 } from "../data/restAreaMenu_2_1.ts";
import { restAreaMenu_2_2 } from "../data/restAreaMenu_2_2.ts";
import { restAreaMenu_2_3 } from "../data/restAreaMenu_2_3.ts";
import { restAreas } from "../data/restAreas.ts";

interface MenuProps {
  restAreaId: number;
  categoryId: number;
  subCategoryId: number;
  onAddToCart: (menuName: string, price: number) => void;
}

const Menu = ({ restAreaId, categoryId, subCategoryId, onAddToCart }: MenuProps) => {
  let selectedMenuObj: any = null;

  if (restAreaId === 1) {
    if (categoryId === 1) {
      selectedMenuObj = restAreaMenu_1_1;
    }
  } else if (restAreaId === 2) {
    if (categoryId === 1) {
      selectedMenuObj = restAreaMenu_1_1;
    }
  }

  const subCategoryMenu = selectedMenuObj?.menus.find(
    (menu: any) => menu.subCategoryId === subCategoryId
  );

  const menuData = subCategoryMenu ? subCategoryMenu.items : [];

  return (
    <Box>
      <Stack spacing={1}>
        {menuData.map((item: any, idx: number, array: any[]) => (
          <Box key={item.menuId}>
            <Button
              onClick={() => onAddToCart(item.menuName, item.price)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                width: "60%",
                ml: 2,
              }}
            >
              <Typography sx={{ color: "black" }}>{item.menuName}</Typography>
              <Typography sx={{ color: "black" }}>
                {item.price.toLocaleString()}원
              </Typography>
            </Button>
            {idx !== array.length - 1 && (
              <Divider sx={{ mt: 2, mb: 1, ml: 2, mr: 2 }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Menu;
