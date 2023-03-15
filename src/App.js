import React, { useEffect, useState } from 'react';
import PlanetTable from './components/PlanetTable';
import './App.css';
import PlanetContext from './context/PlanetContext';
import FilterMenu from './components/FilterMenu';

function App() {
  const [planetsInfo, setInfo] = useState({});
  const [nameFilter, setNameFilter] = useState('');
  const [filtrar, setFilter] = useState(false);

  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [count, setCount] = useState('0');

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
    setColuna(newColuna);
    setOperador(newOperador);
    setCount(newCount);
    setFilter(true);
  }

  const context = {
    planetsInfo,
    nameFilter,
    filtrar,
    coluna,
    operador,
    count,
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
