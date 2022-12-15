import React from 'react';
import Display from './Display'
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <Display />
    </CookiesProvider>
  );
}

export default App;
