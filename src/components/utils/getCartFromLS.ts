import { CartItem } from "../../redux/cart/types";
import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  return {
    items: items as CartItem[],
    totalPrice,
    totalCount,
  };
};
