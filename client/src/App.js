import React from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Landing />
    </Provider>
  );
}

export default App;
