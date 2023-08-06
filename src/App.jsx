import React from 'react';
import { Outlet } from 'react-router-dom';

import './scss/app.scss';

import { Header } from './components/Header';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Outlet context={[searchValue, setSearchValue]} />
      </div>
    </div>
  );
}

export default App;
