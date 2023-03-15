import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterMenu() {
  const { nameOnChange, onFilter } = useContext(PlanetContext);

  const [newColuna, setNewColuna] = useState('population');
  const [newOperador, setNewOperador] = useState('maior que');
  const [newCount, setNewCount] = useState('0');

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

  const submitFilter = () => {
    onFilter(newColuna, newOperador, newCount);
  };

  return (
    <fieldset>
      <h1>STAR WARS</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ inputOnChange }
      />
      <label htmlFor="coluna">Coluna</label>
      <select
        name="coluna"
        id="coluna"
        defaultValue="population"
        data-testid="column-filter"
        onClick={ colunaOnChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="operador">Operador</label>
      <select
        name="operador"
        id="operador"
        defaultValue=">"
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
    </fieldset>
  );
}

export default FilterMenu;
