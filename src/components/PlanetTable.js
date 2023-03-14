import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import './componentsCSS.css';

function PlanetTable() {
  const { planetsInfo, nameFilter } = useContext(PlanetContext);
  console.log(nameFilter);

  const [planets, setPlanets] = useState([]);

  const tableMount = (array) => {
    const newPlanets = array.map((planet) => {
      const {
        name,
        diameter,
        climate,
        gravity,
        terrain,
        population,
        films,
        created,
        edited,
        url,
      } = planet;
      return (
        <tr key={ name }>
          <td>{ name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ diameter }</td>
          <td>{ climate }</td>
          <td>{ gravity }</td>
          <td>{ terrain }</td>
          <td>{ planet.surface_water}</td>
          <td>{ population }</td>
          <td>{ films }</td>
          <td>{ created}</td>
          <td>{ edited }</td>
          <td>{ url }</td>
        </tr>
      );
    });
    setPlanets(newPlanets);
  };

  useEffect(() => {
    if (planetsInfo.results !== undefined) {
      let resultados = planetsInfo.results;
      if (nameFilter !== '') {
        const newResultados = resultados.filter((element) => (
          element.name.includes(nameFilter)
        ));
        resultados = newResultados;
      }
      tableMount(resultados);
    }
  }, [planetsInfo, nameFilter]);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planets }
      </tbody>
    </table>
  );
}

export default PlanetTable;
