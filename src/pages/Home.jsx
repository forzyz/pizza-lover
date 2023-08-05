import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';

import { MyContext } from '../context';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'popularity',
    sortProp: 'rating',
  });

  React.useEffect(() => {
    const url = new URL('https://64cb635c700d50e3c705d0b2.mockapi.io/items');
    const orderCheck = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProp.replace('-', '');

    categoryId > 0 && url.searchParams.append('category', `${categoryId}`);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', orderCheck); // order parameter is optional and will default to `asc`

    setIsLoading(true);
    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert('Error occured when get data');
        }
      })
      .then((tasks) => {
        setItems(tasks);
        setIsLoading(false);
      })
      .catch((error) => {
        alert('Error occured when set data');
        console.error(error);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <MyContext.Provider value={{ items, setItems, setIsLoading }}>
      <div className="container">
        <div className="content__top">
          <Categories activeIndex={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
          <Sort sortObj={sortType} onChangeSort={(obj) => setSortType(obj)} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {isLoading
            ? [...Array(10)].map((_, index) => <PizzaSkeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </MyContext.Provider>
  );
};
