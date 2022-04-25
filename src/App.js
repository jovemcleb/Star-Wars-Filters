import React from 'react';
import Content from './Pages/Content/Content';
import Provider from './Provider/myProvider';

function App() {
  return (
    <Provider>
      <Content />
    </Provider>
  );
}

export default App;
