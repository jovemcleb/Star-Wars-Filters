import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/myContext';
import fetchPlanets from '../Services/apiPlanet';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numberFilter, setNumberFilter] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );
  const [activeFilters, setActiveFilters] = useState([]);

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

  const filterByNumber = (line) => {
    const bools = [];
    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(line[filter.column]) > Number(filter.value));
        break;

      case 'menor que':
        bools.push(Number(line[filter.column]) < Number(filter.value));
        break;

      case 'igual a':
        bools.push(Number(line[filter.column]) === Number(filter.value));
        break;

      default:
        return true;
      }
    });
    return bools.every((element) => element);
  };

  const context = {
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
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
