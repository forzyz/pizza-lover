import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import { Pagination } from '../components/Pagination';

import { SearchContext } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sortType } = useSelector((state) => state.filterReducer);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    const url = new URL('https://64cb635c700d50e3c705d0b2.mockapi.io/items');
    const orderCheck = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProp.replace('-', '');

    categoryId > 0 && url.searchParams.append('category', `${categoryId}`);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', orderCheck); // order parameter is optional and will default to `asc`
    url.searchParams.append('title', searchValue);
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', 4);

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
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(10)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
