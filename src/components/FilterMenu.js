import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterMenu() {
  const { nameOnChange, onFilter, offFilter, applyFilters,
    offAllFilters, sortOrder } = useContext(PlanetContext);

  const [newColuna, setNewColuna] = useState('population');
  const [newOperador, setNewOperador] = useState('maior que');
  const [newCount, setNewCount] = useState('0');
  const [newOrderColuna, setNewOrderColuna] = useState('population');
  const [newOrder, setNewOrder] = useState('');

  const [filters, setFilters] = useState([]);

  const INITIAL_COLUNA_STATE = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const [colunaOptions, setColunaOptions] = useState(INITIAL_COLUNA_STATE);
  const [liOptions, setLiOptions] = useState([]);

  const inputOnChange = ({ target }) => {
    nameOnChange(target.value);
  };

  const colunaOnChange = ({ target }) => {
    setNewColuna(target.value);
  };

  const operadorOnChange = ({ target }) => {
    setNewOperador(target.value);
  };

  const countOnChange = ({ target }) => {
    setNewCount(target.value);
  };

  const orderColunaOnChange = ({ target }) => {
    setNewOrderColuna(target.value);
  };

  const orderOnChange = ({ target }) => {
    setNewOrder(target.value);
  };

  const removeColunaOptions = (removedColuna) => {
    const newColunaOptions = colunaOptions.filter((element) => (
      element !== removedColuna
    ));
    setColunaOptions(newColunaOptions);
  };

  const submitFilter = () => {
    onFilter(newColuna, newOperador, newCount);
    removeColunaOptions(newColuna);
  };

  useEffect(() => {
    const newFilters = applyFilters.map((element) => {
      const { coluna, operador, count } = element;
      const text = `${coluna} ${operador} ${count}`;
      return (
        <li key={ text } data-testid="filter" className="filtro">
          <p>{ text }</p>
          <button
            onClick={ () => {
              const newColunaOptions = colunaOptions;
              newColunaOptions.push(coluna);
              setColunaOptions(newColunaOptions);
              offFilter(coluna);
            } }
          >
            Remover
          </button>
        </li>
      );
    });
    setFilters(newFilters);

    const newColunaOptions = colunaOptions.map((element) => (
      <option value={ element } key={ element }>
        { element }
      </option>
    ));
    setLiOptions(newColunaOptions);
    setNewColuna(colunaOptions[0]);
  }, [applyFilters, offFilter, colunaOptions]);

  return (
    <fieldset>
      <h1>STAR WARS</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ inputOnChange }
      />
      <br />
      <label htmlFor="coluna">Coluna</label>
      <select
        name="coluna"
        id="coluna"
        defaultValue="population"
        data-testid="column-filter"
        onClick={ colunaOnChange }
      >
        { liOptions }
      </select>
      <label htmlFor="operador">Operador</label>
      <select
        name="operador"
        id="operador"
        defaultValue="maior que"
        data-testid="comparison-filter"
        onClick={ operadorOnChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        min="0"
        value={ newCount }
        data-testid="value-filter"
        onChange={ countOnChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ submitFilter }
      >
        Filtrar
      </button>
      <br />
      <label htmlFor="order">Ordenar</label>
      <select
        name="order"
        id="order"
        defaultValue="population"
        data-testid="column-sort"
        onClick={ orderColunaOnChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <br />
      <label htmlFor="ASC">Ascendente</label>
      <input
        type="radio"
        id="ASC"
        name="Orders"
        value="ASC"
        data-testid="column-sort-input-asc"
        onClick={ orderOnChange }
      />
      <label htmlFor="DESC">Descendente</label>
      <input
        type="radio"
        id="DESC"
        name="Orders"
        value="DESC"
        data-testid="column-sort-input-desc"
        onClick={ orderOnChange }
      />
      <br />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortOrder(newOrderColuna, newOrder) }
      >
        Ordenar
      </button>
      <br />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setColunaOptions(INITIAL_COLUNA_STATE);
          offAllFilters();
        } }
      >
        Remover Filtros
      </button>
      <ul>
        { filters }
      </ul>
    </fieldset>
  );
}

export default FilterMenu;
