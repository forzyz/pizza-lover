import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { Categories } from "../components/Categories";
import { SortPopup, list } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import { Pagination } from "../components/Pagination";

import { useSelector } from "react-redux";
import {
  FilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const url = new URL("https://64cb635c700d50e3c705d0b2.mockapi.io/items");
    const orderCheck = sort.sortProp.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProp.replace("-", "");

    categoryId > 0 && url.searchParams.append("category", `${categoryId}`);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", orderCheck); // order parameter is optional and will default to `asc`
    url.searchParams.append("title", searchValue);
    url.searchParams.append("page", currentPage.toString());
    url.searchParams.append("limit", "4");

    dispatch(fetchPizzas(url.toString()));

    window.scrollTo(0, 0);
  };

  // If changed params and there was first render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProp, currentPage]);

  // If there was first render, then check URL-settings and save in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterSliceState;

      const sort = list.find((obj) => obj.sortProp === params.sortProp);

      dispatch(
        setFilters({
          ...params,
          sort: sort || list[0],
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
  }, [categoryId, sort.sortProp, searchValue, currentPage]);

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
        <SortPopup value={sort} />
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
