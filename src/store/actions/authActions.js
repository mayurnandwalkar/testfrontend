import artistInstance from "src/axios/artistInstance";
import authInstance from "src/axios/authInstance";
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
} from "../action-types";
import { saveToken, deleteToken } from "../localStorage";
import userInstance from "src/axios/userInstance";

export const signIn = (formValues) => {
  const { email, password } = formValues;

  return async (dispatch) => {
    const loginResponse = await authInstance.post("/sign-in", {
      email,
      password,
    });
    // console.log(loginResponse,"loginResponse");

    const token = loginResponse.data.token;
    const user = loginResponse.data.artist;

    if (user.status !== "Blocked" && user.status !== "Suspended") {
      saveToken(token);
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    }

    return user;
  };
};

export const signUp = (formValues) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    phoneNo,
    role,
    dateOfBirth,
    hasAcceptedTerms,
  } = formValues;

  return async (dispatch) => {
    const signUpResponse = await authInstance.post("/sign-up", {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNo,
      role,
      dateOfBirth,
      hasAcceptedTerms,
    });
  };
};

export const artistOnboarding = (formValues) => {
  return async (dispatch) => {
    const response = await artistInstance.post("/onboarding", formValues, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data.user);

    dispatch({ type: SIGN_IN_SUCCESS, payload: response.data.user });
  };
};

export const loadProfile = (token) => {
  return async (dispatch) => {
    try {
      const loadProfileResponse = await userInstance.get("/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: loadProfileResponse.data.user,
      });
    } catch (error) {
      return error;
    }
  };
};

export const signOut = () => {
  deleteToken();
  return { type: SIGN_OUT_SUCCESS };
};

export const updateProfile = (formValues) => {
  const { firstName, lastName, password, confirmPassword } = formValues;

  return async (dispatch) => {
    const response = await userInstance.patch("/update-profile", {
      firstName,
      lastName,
      password,
      confirmPassword,
    });

    console.log("response: ", response);

    dispatch({ type: LOAD_PROFILE_SUCCESS, payload: response.data });
  };
};

export const updateArtistProfile = (formData) => {
  return async (dispatch) => {
    const response = await artistInstance.patch("/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response: ", response);

    dispatch({ type: LOAD_PROFILE_SUCCESS, payload: response.data.artist });
  };
};
