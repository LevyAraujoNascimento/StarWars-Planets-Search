import React, { useEffect, useState } from 'react';
import PlanetTable from './components/PlanetTable';
import './App.css';
import PlanetContext from './context/PlanetContext';
import FilterMenu from './components/FilterMenu';

function App() {
  const [planetsInfo, setInfo] = useState({});
  const [nameFilter, setNameFilter] = useState('');

  const [applyFilters, setApplyFilters] = useState([]);
  const [numFilters, setNumFilters] = useState(0);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setInfo(data))
      .catch((error) => console.error(error));
  }, []);

  function nameOnChange(name) {
    setNameFilter(name);
  }

  function onFilter(newColuna, newOperador, newCount) {
    const newFilter = {
      coluna: newColuna,
      operador: newOperador,
      count: newCount,
    };
    const newApplyFilters = applyFilters;
    newApplyFilters.push(newFilter);
    setApplyFilters(newApplyFilters);
    setNumFilters(numFilters + 1);
  }

  const context = {
    planetsInfo,
    nameFilter,
    applyFilters,
    numFilters,
    nameOnChange,
    onFilter,
  };

  return (
    <PlanetContext.Provider value={ context }>
      <FilterMenu />
      <PlanetTable />
    </PlanetContext.Provider>
  );
}

export default App;
