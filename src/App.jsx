import React from 'react';
import { Outlet } from 'react-router-dom';

import './scss/app.scss';

import { Header } from './components/Header';
import { SearchContext } from './context';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
