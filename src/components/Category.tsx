import { Box, Tabs, Tab } from "@mui/material";
import { category } from "../data/category.ts";

interface CategoryProps {
  restAreaId: number;
  selectedCategoryId: number;
  onCategoryChange: (categoryId: number, firstSubCategoryId: number) => void;
}

const Category = ({
  restAreaId,
  selectedCategoryId,
  onCategoryChange,
}: CategoryProps) => {
  const categories = category.find(
    (restArea) => restArea.restAreaId === restAreaId
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const selectedCategory = categories?.category.find(
      (c) => c.id === newValue
    );
    const firstSubCategoryId =
      selectedCategory?.subCategory[0]?.subCategoryId || 0;
    onCategoryChange(newValue, firstSubCategoryId);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Tabs
        value={selectedCategoryId}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="secondary"
      >
        {categories?.category.map((category) => (
          <Tab key={category.id} label={category.name} value={category.id} />
        ))}
      </Tabs>
    </Box>
  );
};

export default Category;
