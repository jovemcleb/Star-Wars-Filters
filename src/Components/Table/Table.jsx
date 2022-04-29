/* eslint-disable react-hooks/exhaustive-deps */
// import { element } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/myContext';
import './table.css';

export default function Table() {
  const {
    getPlanets,
    planetsFilter,
    filterByName,
    handleSearch,
    planetsFilteredByName,
    numberFilter,
    setNumberFilter,
    activeFilters,
    setActiveFilters,
    filterByNumber,
  } = useContext(Context);

  const [arrOptions, setArrOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const options = [];

  const filterOptions = (option) => {
    if (activeFilters.length === 0) {
      return;
    }
    activeFilters.forEach(({ column }) => {
      console.log('Entrei no forEach');
      if (column !== option) {
        options.push(option);
        console.log(options);
      }
    });
    setArrOptions(options);
  };

  useEffect(() => {
    arrOptions.filter(filterOptions);
  }, [activeFilters]);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    planetsFilteredByName();
  }, [filterByName]);

  useEffect(() => {
    console.log(activeFilters);
  }, [activeFilters]);

  return (
    <>
      <h1>Star Wars Planets</h1>
      <form>
        <input
          type="text"
          name="search-input"
          id="search-input"
          value={ filterByName }
          onChange={ (e) => handleSearch(e) }
          data-testid="name-filter"
        />

        <select
          name=""
          id=""
          data-testid="column-filter"
          value={ numberFilter.column }
          onChange={
            ({ target }) => setNumberFilter({ ...numberFilter, column: target.value })
          }
        >
          {
            arrOptions.map((element) => (
              <option key={ element } value={ element }>{element}</option>
            ))
          }
        </select>

        <select
          name=""
          id=""
          data-testid="comparison-filter"
          value={ numberFilter.comparison }
          onChange={
            ({ target }) => setNumberFilter({ ...numberFilter, comparison: target.value })
          }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          name=""
          id=""
          value={ numberFilter.value }
          data-testid="value-filter"
          onChange={
            ({ target }) => setNumberFilter({ ...numberFilter, value: target.value })
          }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setNumberFilter({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
            setActiveFilters([...activeFilters, numberFilter]);
          } }
        >
          Filtrar
        </button>
      </form>
      <table className="content-table">
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
          { planetsFilter.filter(filterByNumber).map((e) => (
            <tr key={ e.name }>
              <td>{e.name}</td>
              <td>{e.rotation_period}</td>
              <td>{e.orbital_period}</td>
              <td>{e.diameter}</td>
              <td>{e.climate}</td>
              <td>{e.gravity}</td>
              <td>{e.terrain}</td>
              <td>{e.surface_water}</td>
              <td>{e.population}</td>
              <td>{e.films}</td>
              <td>{e.created}</td>
              <td>{e.edited}</td>
              <td>{e.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
