import axios from 'axios';
import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  DELETE_TRASH,
  RESTORE_CHARACTER,
  RESTORE_CHARACTER_AT_INDEX,
  EDIT_CHARACTER,
  CHARACTERS_LOADING,
  CHARACTER_ERROR
} from './types';

export const getCharacters = () => async dispatch => {
  dispatch(setCharactersLoading());
  try {
    const res = await axios.get('/api/character');

    dispatch({
      type: GET_CHARACTERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const setCharactersLoading = () => {
  return {
    type: CHARACTERS_LOADING
  };
};

export const deleteCharacter = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_CHARACTER,
      payload: id
    })
  );
};

export const addCharacter = character => async dispatch => {
  try {
    const res = await axios.post('/api/character', character);

    dispatch({
      type: ADD_CHARACTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.data.errors, status: err.response.status }
    });
  }
};

export const deleteTrash = checked => {
  return {
    type: DELETE_TRASH,
    payload: checked
  };
};

export const restoreCharacter = character => {
  return {
    type: RESTORE_CHARACTER,
    payload: character
  };
};

export const restoreCharacterAtIndex = (character, index) => {
  return {
    type: RESTORE_CHARACTER_AT_INDEX,
    payload: character,
    index
  };
};

export const editCharacter = (character, index) => async dispatch => {
  try {
    const res = await axios.patch(`/api/character/${character._id}`, character);

    dispatch({
      type: EDIT_CHARACTER,
      payload: res.data,
      index
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};
