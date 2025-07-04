import { Box, Button } from "@mui/material";
import { category } from "../data/category.ts";

interface SubCategoryProps {
  restAreaId: number;
  categoryId: number;
  selectedSubCategoryId: number;
  onSubCategoryChange: (id: number) => void;
}

const SubCategory = ({
  restAreaId,
  categoryId,
  selectedSubCategoryId,
  onSubCategoryChange,
}: SubCategoryProps) => {
  const selectedCategory = category.find(
    (restArea) => restArea.restAreaId == restAreaId
  );
  const selectedSubCategory = selectedCategory?.category.find(
    (item) => item.id == categoryId
  )?.subCategory;

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        borderBottom: "1px solid #ddd",
      }}
    >
      {selectedSubCategory?.map((item) => (
        <Button
          key={item.subCategoryId}
          size="small"
          sx={{
            borderRadius: "999px",
            m: 0.5,
            flexShrink: 0,
            whiteSpace: "nowrap",
            fontSize: 12,
            backgroundColor:
              selectedSubCategoryId === item.subCategoryId
                ? "#00796b"
                : "transparent",
            color:
              selectedSubCategoryId === item.subCategoryId ? "white" : "black",
          }}
          onClick={() => onSubCategoryChange(item.subCategoryId)}
        >
          {item.subCategoryName}
        </Button>
      ))}
    </Box>
  );
};

export default SubCategory;
