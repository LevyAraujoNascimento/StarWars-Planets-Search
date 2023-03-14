import React, { useEffect, useState } from 'react';
import PlanetTable from './components/PlanetTable';
import './App.css';
import PlanetContext from './context/PlanetContext';

function App() {
  const [planetsInfo, setInfo] = useState({});

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setInfo(data))
      .catch((error) => console.error(error));
  }, []);

  const context = {
    planetsInfo,
  };

  return (
    <PlanetContext.Provider value={ context }>
      <PlanetTable />
    </PlanetContext.Provider>
  );
}

export default App;
