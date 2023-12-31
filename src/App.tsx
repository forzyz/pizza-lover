import React from "react";
import { Outlet } from "react-router-dom";

import "./scss/app.scss";

import Header from "./components/Header";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
