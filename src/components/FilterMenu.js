import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterMenu() {
  const { nameOnChange } = useContext(PlanetContext);
  const inputOnChange = ({ target }) => {
    nameOnChange(target.value);
  };
  return (
    <fieldset>
      <h1>STAR WARS</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ inputOnChange }
      />
    </fieldset>
  );
}

export default FilterMenu;
