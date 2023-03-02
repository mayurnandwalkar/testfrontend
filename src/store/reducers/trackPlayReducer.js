import { PLAY_TRACK, PAUSE_TRACK, STOP_TRACK } from "../action-types";

const initialState = {
  track: null,
  playlist: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        track: action.payload.track,
        playlist: action.payload.playlist,
      };
    case PAUSE_TRACK:
      return {
        ...state,
        track: null,
      };
    case STOP_TRACK:
      return {
        ...state,
        track: null,
        playlist: [],
      };

    default:
      return state;
  }
}
