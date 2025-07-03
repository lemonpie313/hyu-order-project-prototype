export interface MenuItem {
  name: string;
  price: number;
}

export interface MenuData {
  [category: string]: MenuItem[];
}

export const restaurantMenuData: MenuData = {
  '추천': [
    { name: '라면', price: 4500 },
    { name: '제육덮밥', price: 7500 },
  ],
  '한식': [
    { name: '제육덮밥', price: 7500 },
    { name: '김치찌개', price: 8000 },
  ],
  '분식': [
    { name: '떡볶이', price: 5000 },
    { name: '튀김우동', price: 6000 },
  ],
  '라면/우동': [
    { name: '라면', price: 4500 },
    { name: '우동', price: 5500 },
  ],
  '덮밥': [
    { name: '제육덮밥', price: 7500 },
    { name: '소불고기덮밥', price: 8500 },
  ],
};