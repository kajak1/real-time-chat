import React from 'react';
import { render } from 'react-dom';
import Chat from '../chat';

const App = () => {
  return <Chat />;
};

render(<App />, document.getElementById('root'));
