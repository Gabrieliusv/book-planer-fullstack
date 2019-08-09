import axios from "axios";
import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  DELETE_TRASH,
  RESTORE_CHARACTER,
  RESTORE_CHARACTER_AT_INDEX,
  EDIT_CHARACTER,
  CHARACTERS_LOADING
} from "./types";

export const getCharacters = () => dispatch => {
  dispatch(setCharactersLoading());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_CHARACTERS,
      payload: res.data
    })
  );
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
  )
};

export const addCharacter = character => dispatch => {
  axios.post("/api/items", character).then(res =>
    dispatch({
      type: ADD_CHARACTER,
      payload: res.data
    })
  );
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

export const editCharacter = (character, index) => dispatch => {
  axios.patch(`/api/items/${character._id}`, character).then(res =>
    dispatch({
      type: EDIT_CHARACTER,
      payload: character,
      index
    })
  )
};
