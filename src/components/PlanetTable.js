import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import './componentsCSS.css';

function PlanetTable() {
  const NEGATIVO = -1;
  const POSITIVO = 1;
  const { planetsInfo, nameFilter, applyFilters,
    numFilters, order } = useContext(PlanetContext);

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
          <td data-testid="planet-name">{ name }</td>
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

  const switchOperador = (coluna, operador, count, newResultados) => {
    switch (operador) {
    case 'maior que':
      return newResultados.filter((e) => (
        parseFloat(e[coluna]) > parseFloat(count)
      ));
    case 'menor que':
      return newResultados.filter((e) => (
        parseFloat(e[coluna]) < parseFloat(count)
      ));
    case 'igual a':
      return newResultados.filter((e) => (
        parseFloat(e[coluna]) === parseFloat(count)
      ));
    default:
      break;
    }
  };

  useEffect(() => {
    if (planetsInfo.results !== undefined) {
      let resultados = planetsInfo.results;
      if (numFilters > 0) {
        let newResultados = resultados;
        let aux = [];
        applyFilters.forEach((filtro) => {
          const { coluna, operador, count } = filtro;
          aux = switchOperador(coluna, operador, count, newResultados);
          newResultados = aux;
        });
        resultados = newResultados;
      }
      if (nameFilter !== '') {
        const newResultados = resultados.filter((element) => (
          element.name.includes(nameFilter)
        ));
        resultados = newResultados;
      }
      resultados.sort((a, b) => {
        if (a[order.coluna] === 'unknown') return POSITIVO;
        if (b[order.coluna] === 'unknown') return NEGATIVO;
        if (order.ordem === 'ASC') {
          return parseFloat(a[order.coluna]) - parseFloat(b[order.coluna]);
        }
        return parseFloat(b[order.coluna]) - parseFloat(a[order.coluna]);
      });
      tableMount(resultados);
    }
  }, [planetsInfo, nameFilter, applyFilters, numFilters, order, NEGATIVO, POSITIVO]);
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
