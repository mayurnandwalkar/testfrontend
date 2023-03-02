import { PLAY_TRACK, PAUSE_TRACK, STOP_TRACK } from "../action-types";

export const playTrack = (trackData) => {
  return (dispatch) => {
    dispatch({ type: PLAY_TRACK, payload: trackData });
  };
};

export const pauseTrack = () => {
  return (dispatch) => {
    dispatch({ type: PAUSE_TRACK });
  };
};

export const stopTrack = () => {
  return (dispatch) => {
    dispatch({ type: STOP_TRACK });
  };
};
