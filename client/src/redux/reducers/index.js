import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
    characters: characterReducer,
    navigation: navigationReducer,
})