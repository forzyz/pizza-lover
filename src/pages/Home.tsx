import React from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";

import { Categories } from "../components/Categories";
import { Sort, list } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import { Pagination } from "../components/Pagination";

import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const url = new URL("https://64cb635c700d50e3c705d0b2.mockapi.io/items");
    const orderCheck = sortType.sortProp.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProp.replace("-", "");

    categoryId > 0 && url.searchParams.append("category", `${categoryId}`);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", orderCheck); // order parameter is optional and will default to `asc`
    url.searchParams.append("title", searchValue);
    url.searchParams.append("page", currentPage);
    url.searchParams.append("limit", "4");

    dispatch(
      // @ts-ignore
      fetchPizzas(url)
    );

    window.scrollTo(0, 0);
  };

  // If changed params and there was first render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sortType.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProp, currentPage]);

  // If there was first render, then check URL-settings and save in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProp === params.sortProp);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // If there was first render, then fetch pizzas
  React.useEffect(() => {
    if (!isSearch.current || categoryId === 0) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProp, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(10)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Error occured 😕</h2>
          <p>
            Failed to get pizzas :( <br /> Try again later
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
