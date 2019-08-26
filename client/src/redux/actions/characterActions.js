import axios from 'axios';
import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  CHARACTER_TO_TRASH,
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

export const addCharacter = character => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/character', character, config);

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

export const editCharacter = (character, index) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(
      `/api/character/${character._id}`,
      character,
      config
    );

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

export const setCharactersLoading = () => {
  return {
    type: CHARACTERS_LOADING
  };
};

export const characterToTrash = id => async dispatch => {
  try {
    await axios.patch(`/api/character/trash/${id}`);

    dispatch({
      type: CHARACTER_TO_TRASH,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

export const deleteTrash = checked => async dispatch => {
  let characters = [];
  checked.forEach(char => characters.push(char._id));
  const body = JSON.stringify({ id: characters });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  };

  try {
    await axios.delete('/api/character/delete', config);

    dispatch({
      type: DELETE_TRASH,
      payload: checked
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

export const restoreCharacter = character => async dispatch => {
  let list = [];
  character.forEach(char => list.push(char._id));
  const body = JSON.stringify({ id: list });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.patch('/api/character/trash/manage/all', body, config);

    dispatch({
      type: RESTORE_CHARACTER,
      payload: character
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

export const restoreCharacterAtIndex = (character, index) => async dispatch => {
  let list = [character._id];
  const body = JSON.stringify({ id: list });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.patch('/api/character/trash/manage/all', body, config);

    dispatch({
      type: RESTORE_CHARACTER_AT_INDEX,
      payload: character,
      index
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
  }
};
