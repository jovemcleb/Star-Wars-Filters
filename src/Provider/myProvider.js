import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/myContext';
import fetchPlanets from '../Services/apiPlanet';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [planetsFilter, setPlanetsFilter] = useState([]);

  const getPlanets = async () => {
    const planetsResponse = await fetchPlanets();
    setPlanets(planetsResponse);
    setPlanetsFilter(planetsResponse);
  };

  const handleSearch = ({ target }) => {
    const { value } = target;
    setFilterByName(value);
  };

  const planetsFilteredByName = () => {
    if (filterByName.length === 0) {
      return setPlanetsFilter(planets);
    }
    const filterPlanets = planets.filter(({ name }) => name.includes(filterByName));
    setPlanetsFilter(filterPlanets);
  };

  const context = {
    planets,
    planetsFilter,
    getPlanets,
    filterByName,
    handleSearch,
    planetsFilteredByName,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
