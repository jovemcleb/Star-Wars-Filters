/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Context from '../../Context/myContext';
import './table.css';

export default function Table() {
  const {
    getPlanets,
    planetsFilter,
    filterByName,
    handleSearch,
    planetsFilteredByName } = useContext(Context);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    planetsFilteredByName();
  }, [filterByName]);

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
          { planetsFilter.map((e) => (
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
