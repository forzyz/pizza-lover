import React from "react";

type CategoriesProps = {
  activeIndex: number;
  onChangeCategory: (i: number) => void;
};

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export const Categories: React.FC<CategoriesProps> = ({
  activeIndex,
  onChangeCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
