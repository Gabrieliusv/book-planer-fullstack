import {
  CHARACTERS_LOADING,
  GET_CHARACTERS,
  CHARACTER_ERROR,
  ADD_CHARACTER,
  CHARACTER_TO_TRASH,
  DELETE_TRASH,
  RESTORE_CHARACTER,
  RESTORE_CHARACTER_AT_INDEX,
  EDIT_CHARACTER,
  CLEAR_CHARACTERS,
  ADD_STORY,
  EDIT_STORY
} from '../actions/types';

const initialState = {
  charactersInfo: [],
  inTrash: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { payload, type, index } = action;
  switch (type) {
    case GET_CHARACTERS:
      return {
        ...state,
        charactersInfo: payload.filter(char => char.inTrash === false),
        inTrash: payload.filter(char => char.inTrash === true),
        loading: false
      };
    case CHARACTERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CHARACTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CHARACTER_TO_TRASH:
      return {
        ...state,
        charactersInfo: state.charactersInfo.filter(i => i._id !== payload),
        inTrash: [
          ...state.inTrash,
          state.charactersInfo.find(i => i._id === payload)
        ]
      };
    case ADD_CHARACTER:
      return {
        ...state,
        charactersInfo: [...state.charactersInfo, payload]
      };
    case DELETE_TRASH:
      return {
        ...state,
        inTrash: state.inTrash.filter(a => payload.every(b => a !== b))
      };
    case RESTORE_CHARACTER:
      return {
        ...state,
        charactersInfo: [...state.charactersInfo, ...payload],
        inTrash: state.inTrash.filter(a => payload.every(b => a !== b))
      };
    case RESTORE_CHARACTER_AT_INDEX:
      let newState = [...state.charactersInfo];
      newState.splice(index, 0, payload);
      return {
        ...state,
        charactersInfo: newState,
        inTrash: state.inTrash.filter(a => a !== payload)
      };
    case EDIT_CHARACTER:
      let editState = [...state.charactersInfo];
      editState.splice(index, 1, payload);
      return {
        ...state,
        charactersInfo: editState
      };
    case CLEAR_CHARACTERS:
      return {
        ...state,
        charactersInfo: [],
        inTrash: [],
        loading: true,
        error: {}
      };
    case ADD_STORY:
    case EDIT_STORY:
      return {
        ...state,
        charactersInfo: state.charactersInfo.map(char =>
          char._id === payload.id ? { ...char, story: payload.story } : char
        )
      };
    default:
      return state;
  }
}
