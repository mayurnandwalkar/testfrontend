import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
} from "../action-types";

const INITIAL_STATE = {
  isSignedIn: false,
  userID: "",
  firstName: "",
  lastName: "",
  role: "",
  gender: "",
  email: "",
  subscribed: false,
  isArtistOnboarded: false,
  artistProfilePicture: "",
  artistBannerImage: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userID: action.payload._id,
        gender: action.payload.gender,
        email: action.payload.email,
        role: action.payload.role,
        isArtistOnboarded: action.payload.onBoarded,
        artistProfilePicture: action.payload.profilePicture,
        artistBannerImage: action.payload.bannerImage,
        subscribed: action.payload.subscribed,
      };

    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userID: action.payload._id,
        gender: action.payload.gender,
        email: action.payload.email,
        role: action.payload.role,
        isArtistOnboarded: action.payload.onBoarded,
        artistProfilePicture: action.payload.profilePicture,
        artistBannerImage: action.payload.bannerImage,
        subscribed: action.payload.subscribed,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
        firstName: "",
        lastName: "",
        userID: "",
        gender: "",
        email: "",
        role: "",
        isArtistOnboarded: false,
        artistProfilePicture: "",
        artistBannerImage: "",
        subscribed: false,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
