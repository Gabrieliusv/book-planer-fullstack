import React, { useEffect } from 'react';
import Landing from './components/layout/Landing';
import CustomNav from './components/app/CustomNav';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser, noToken } from './redux/actions/authActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    } else {
      store.dispatch(noToken());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing} />
        <Switch>
          <PrivateRoute exact path='/dashboard' component={CustomNav} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
