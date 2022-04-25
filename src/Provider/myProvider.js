import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/myContext';
import fetchPlanets from '../Services/apiPlanet';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const planetsResponse = await fetchPlanets();
    setPlanets(planetsResponse);
  };

  const context = {
    planets,
    getPlanets,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
