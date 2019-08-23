import {
  TOGGLE_ADDCHARACTER,
  TOGGLE_TRASH,
  OPEN_DELETE_NOTIFICATION,
  CLOSE_DELETE_NOTIFICATION,
  OPEN_EDIT_CHARACTER,
  CLOSE_EDIT_CHARACTER,
  OPEN_CHARACTER,
  CLOSE_CHARACTER,
  OPEN_CHARACTERS_OVERVIEW,
  OPEN_EDIT_STORYLINE,
  CLOSE_EDIT_STORYLINE,
  NAV_PROFILE
} from '../actions/types';

const initialState = {
  addCharacterWindow: false,
  trashWindow: false,
  deleteNotificationWindow: { open: false },
  editCharacterWindow: { open: false },
  characterInfoWindow: false,
  charactersOverviewWindow: true,
  editStoryWindow: { open: false },
  profileNav: 'display'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADDCHARACTER:
      return {
        ...state,
        addCharacterWindow: !state.addCharacterWindow
      };
    case TOGGLE_TRASH:
      return {
        ...state,
        trashWindow: !state.trashWindow
      };
    case OPEN_DELETE_NOTIFICATION:
      return {
        ...state,
        deleteNotificationWindow: action.payload
      };
    case CLOSE_DELETE_NOTIFICATION:
      return {
        ...state,
        deleteNotificationWindow: { open: false }
      };
    case OPEN_EDIT_CHARACTER:
      return {
        ...state,
        editCharacterWindow: action.payload
      };
    case CLOSE_EDIT_CHARACTER:
      return {
        ...state,
        editCharacterWindow: { open: false }
      };
    case OPEN_CHARACTER:
      return {
        ...state,
        characterInfoWindow: action.payload,
        charactersOverviewWindow: false,
        editStoryWindow: { open: false }
      };
    case CLOSE_CHARACTER:
      return {
        ...state,
        characterInfoWindow: false,
        charactersOverviewWindow: true
      };
    case OPEN_CHARACTERS_OVERVIEW:
      return {
        ...state,
        charactersOverviewWindow: true
      };
    case OPEN_EDIT_STORYLINE:
      return {
        ...state,
        editStoryWindow: {
          open: true,
          character: action.payload,
          index: action.index
        }
      };
    case CLOSE_EDIT_STORYLINE:
      return {
        ...state,
        editStoryWindow: { open: false }
      };
    case NAV_PROFILE:
      return {
        ...state,
        profileNav: action.payload
      };
    default:
      return state;
  }
}
