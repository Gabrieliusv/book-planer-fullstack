import axios from 'axios';
import { setAlert, removeAlert } from './alertActions';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  CLEAR_CHARACTERS,
  CLEAR_NAVIGATION
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (formData, update) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (update) {
      dispatch(removeAlert());
      dispatch(setAlert('Profile updated!', 'secondary'));
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete user account
export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete('/api/profile/');

    localStorage.removeItem('token');
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch({
      type: CLEAR_CHARACTERS
    });
    dispatch({
      type: ACCOUNT_DELETED
    });
    dispatch({
      type: CLEAR_NAVIGATION
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
