import React, { useEffect } from 'react';
import Landing from './components/layout/Landing';
import CustomNav from './components/app/CustomNav';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './redux/actions/authActions';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/dashboard' component={CustomNav} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
