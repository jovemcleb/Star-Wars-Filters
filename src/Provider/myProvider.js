import React, { useState } from 'react';
import Context from '../Context/myContext';

export default function Provider({ children }) {
  console.log(children);
  return <Context.Provider>{children}</Context.Provider>;
}
