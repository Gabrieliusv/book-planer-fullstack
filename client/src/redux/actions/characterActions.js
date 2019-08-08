import { GET_CHARACTERS, ADD_CHARACTER, DELETE_CHARACTER, DELETE_TRASH, RESTORE_CHARACTER, RESTORE_CHARACTER_AT_INDEX, EDIT_CHARACTER } from './types';

export const getCharacters = () => {
    return {
        type: GET_CHARACTERS
    }
};

export const deleteCharacter = (id) => {
    return {
        type: DELETE_CHARACTER,
        payload: id
    }
};

export const addCharacter = (character) => {
    return {
        type: ADD_CHARACTER,
        payload: character
    }
};

export const deleteTrash = (checked) => {
    return {
        type: DELETE_TRASH,
        payload: checked
    }
};

export const restoreCharacter = (character) => {
    return {
        type: RESTORE_CHARACTER,
        payload: character,
    }
};

export const restoreCharacterAtIndex = (character, index) => {
    return {
        type: RESTORE_CHARACTER_AT_INDEX,
        payload: character,
        index
    }
};

export const editCharacter = (character, index) => {
    return {
        type: EDIT_CHARACTER,
        payload: character,
        index
    }
};
