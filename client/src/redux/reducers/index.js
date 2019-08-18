import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import navigationReducer from './navigationReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  characters: characterReducer,
  navigation: navigationReducer,
  auth: authReducer,
  alert: alertReducer
});
