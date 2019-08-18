import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert, removeAlert } from './alertAction';

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    localStorage.setItem('token', res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(removeAlert());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(removeAlert());
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    localStorage.removeItem('token');

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
