import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { Home } from "./pages/Home";

import { store } from "./redux/store.js";

const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/pizza-lover",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div>Error is loading....</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<div>Cart is loading....</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "pizza/:id",
        element: (
          <Suspense fallback={<div>Pizza is loading....</div>}>
            <FullPizza />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
