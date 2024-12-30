import { login, register } from '../../api/authAPI';

export const loginUser = (userData) => async (dispatch) => {
  const data = await login(userData);
  dispatch({ type: 'LOGIN_SUCCESS', payload: data });
};

export const registerUser = (userData) => async (dispatch) => {
  const data = await register(userData);
  dispatch({ type: 'REGISTER_SUCCESS', payload: data });
};
