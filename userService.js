import { GlobalConstants } from '../constants';
import Http from '../utils/Http';

export const userService = {
  login,
  logout,
  refreshToken
};

function login(form) {
  return Http.post('login', form)
    .then(function (response) {
      let user = response.data.data;
      localStorage.setItem(GlobalConstants.USER_KEY, JSON.stringify(user));

      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
}

function logout() {
  Http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY)).token;
  localStorage.removeItem(GlobalConstants.USER_KEY);
  return Http.post('logout')
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
    });
}

function refreshToken() {
  Http.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY)).token;
  return Http.post('refresh-token')
    .then(function (response) {
      localStorage.removeItem(GlobalConstants.USER_KEY);
      localStorage.setItem(GlobalConstants.USER_KEY, JSON.stringify(response.data.data));
      return response;
    })
    .catch(function (error) {
    });
}
