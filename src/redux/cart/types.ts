export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
  imageUrl: string;
};

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}
