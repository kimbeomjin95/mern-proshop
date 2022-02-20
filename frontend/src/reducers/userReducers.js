import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAIL_RESET,
} from '../constants/userConstants';

const initialListState = {};

export const userLoginReducer = (state = initialListState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, ...state };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterState = {};

export const userRegisterReducer = (state = userRegisterState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, ...state };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userDetailState = {
  user: {},
};

export const userDetailReducer = (state = userDetailState, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true, ...state };
    case USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAIL_RESET:
      return userDetailState;
    default:
      return state;
  }
};

const userUpdateProfileState = {};

export const userUpdateProfileReducer = (
  state = userUpdateProfileState,
  action,
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return { loading: false, user: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
