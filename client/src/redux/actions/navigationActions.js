import {
  TOGGLE_ADDCHARACTER,
  TOGGLE_TRASH,
  OPEN_DELETE_NOTIFICATION,
  CLOSE_DELETE_NOTIFICATION,
  CLOSE_EDIT_CHARACTER,
  OPEN_EDIT_CHARACTER,
  OPEN_CHARACTER,
  CLOSE_CHARACTER,
  OPEN_CHARACTERS_OVERVIEW,
  OPEN_EDIT_STORYLINE,
  CLOSE_EDIT_STORYLINE,
  NAV_PROFILE
} from './types';

export const toggleAddCharacter = () => {
  return {
    type: TOGGLE_ADDCHARACTER
  };
};

export const toggleTrash = () => {
  return {
    type: TOGGLE_TRASH
  };
};

export const openDeleteNotification = data => {
  return {
    type: OPEN_DELETE_NOTIFICATION,
    payload: data
  };
};

export const closeDeleteNotification = () => {
  return {
    type: CLOSE_DELETE_NOTIFICATION
  };
};

export const openEditCharacter = data => {
  return {
    type: OPEN_EDIT_CHARACTER,
    payload: data
  };
};

export const closeEditCharacter = () => {
  return {
    type: CLOSE_EDIT_CHARACTER
  };
};

export const openCharacter = id => {
  return {
    type: OPEN_CHARACTER,
    payload: id
  };
};
export const closeCharacter = () => {
  return {
    type: CLOSE_CHARACTER
  };
};
export const openCharactersOverview = () => {
  return {
    type: OPEN_CHARACTERS_OVERVIEW
  };
};
export const openEditStoryline = (character, index) => {
  return {
    type: OPEN_EDIT_STORYLINE,
    payload: character,
    index
  };
};
export const closeEditStoryline = () => {
  return {
    type: CLOSE_EDIT_STORYLINE
  };
};

export const profileNav = nav => {
  return {
    type: NAV_PROFILE,
    payload: nav
  };
};
