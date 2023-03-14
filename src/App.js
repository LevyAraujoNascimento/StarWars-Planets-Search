import React, { useEffect, useState } from 'react';
import PlanetTable from './components/PlanetTable';
import './App.css';
import PlanetContext from './context/PlanetContext';
import FilterMenu from './components/FilterMenu';

function App() {
  const [planetsInfo, setInfo] = useState({});
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setInfo(data))
      .catch((error) => console.error(error));
  }, []);

  function nameOnChange(name) {
    console.log(name);
    setNameFilter(name);
  }

  const context = {
    planetsInfo,
    nameFilter,
    nameOnChange,
  };

  return (
    <PlanetContext.Provider value={ context }>
      <FilterMenu />
      <PlanetTable />
    </PlanetContext.Provider>
  );
}

export default App;
