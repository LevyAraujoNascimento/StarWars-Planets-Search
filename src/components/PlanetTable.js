import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import './componentsCSS.css';

function PlanetTable() {
  const NEGATIVO = -1;
  const POSITIVO = 1;
  const { planetsInfo, nameFilter, applyFilters,
    numFilters, order } = useContext(PlanetContext);

  const [planets, setPlanets] = useState([]);

  const ordenarAsc = (array) => {
    array.sort((a, b) => {
      if (a[order.coluna] === 'unknown') return POSITIVO;
      if (b[order.coluna] === 'unknown') return NEGATIVO;
      return parseFloat(a[order.coluna]) - parseFloat(b[order.coluna]);
    });
    return array;
  };

  const ordenarDesc = (array) => {
    array.sort((a, b) => {
      if (a[order.coluna] === 'unknown') return POSITIVO;
      if (b[order.coluna] === 'unknown') return NEGATIVO;
      return parseFloat(b[order.coluna]) - parseFloat(a[order.coluna]);
    });
    return array;
  };

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

  useEffect(() => {
    if (planetsInfo.results !== undefined) {
      let resultados = planetsInfo.results;
      if (numFilters > 0) {
        let newResultados = resultados;
        let aux = [];
        applyFilters.forEach((filtro) => {
          const { coluna, count } = filtro;
          switch (filtro.operador) {
          case 'maior que':
            aux = newResultados.filter((e) => (
              parseFloat(e[coluna]) > parseFloat(count)
            ));
            break;
          case 'menor que':
            aux = newResultados.filter((e) => (
              parseFloat(e[coluna]) < parseFloat(count)
            ));
            break;
          case 'igual a':
            aux = newResultados.filter((e) => (
              parseFloat(e[coluna]) === parseFloat(count)
            ));
            break;
          default:
            break;
          }
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
      if (order.ordem === 'ASC') {
        resultados = ordenarAsc(resultados);
      }
      if (order.ordem === 'DESC') {
        resultados = ordenarDesc(resultados);
      }
      tableMount(resultados);
    }
  }, [planetsInfo, nameFilter, applyFilters, numFilters, order]);
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
