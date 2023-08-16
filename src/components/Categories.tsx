import React from 'react';

type CategoriesProps = {
  activeIndex: number;
  onChangeCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({activeIndex, onChangeCategory}) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={activeIndex === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

 

