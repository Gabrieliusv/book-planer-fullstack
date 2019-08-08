import React from 'react';
import './App.css';
import CustomNav from './components/CustomNav';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <CustomNav />
      </div>
    </Provider>
  );
}

export default App;
