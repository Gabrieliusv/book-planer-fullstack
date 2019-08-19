import {
  CHARACTERS_LOADING,
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  DELETE_TRASH,
  RESTORE_CHARACTER,
  RESTORE_CHARACTER_AT_INDEX,
  EDIT_CHARACTER
} from '../actions/types';

const initialState = {
  charactersInfo: [],
  inTrash: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        charactersInfo: action.payload,
        loading: false
      };
    case CHARACTERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        charactersInfo: state.charactersInfo.filter(
          i => i._id !== action.payload
        ),
        inTrash: [
          ...state.inTrash,
          state.charactersInfo.find(i => i._id === action.payload)
        ]
      };
    case ADD_CHARACTER:
      return {
        ...state,
        charactersInfo: [...state.charactersInfo, action.payload]
      };
    case DELETE_TRASH:
      return {
        ...state,
        inTrash: state.inTrash.filter(a => action.payload.every(b => a !== b))
      };
    case RESTORE_CHARACTER:
      return {
        ...state,
        charactersInfo: [...state.charactersInfo, ...action.payload],
        inTrash: state.inTrash.filter(a => action.payload.every(b => a !== b))
      };
    case RESTORE_CHARACTER_AT_INDEX:
      let newState = [...state.charactersInfo];
      newState.splice(action.index, 0, action.payload);
      return {
        ...state,
        charactersInfo: newState,
        inTrash: state.inTrash.filter(a => a !== action.payload)
      };
    case EDIT_CHARACTER:
      let editState = [...state.charactersInfo];
      editState.splice(action.index, 1, action.payload);
      return {
        ...state,
        charactersInfo: editState
      };
    default:
      return state;
  }
}
