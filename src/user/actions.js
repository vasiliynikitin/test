import api from '../api';

const types = {
  SET: 'user/set',
};

export function setProfile(data = {}) {
  return {
    type: types.SET,
    data,
  }
}

export function login(loginData) {
  return dispatch => {
    return api.request.login(loginData)
      .then(data => dispatch(setProfile(data)));
  };
}

export function logout() {
  return dispatch => api.request.logout()
    .then(() => dispatch(setProfile()));
}

export function getProfile() {
  return dispatch => api.request.profile()
    .catch(() => {})
    .then(data => dispatch(setProfile(data)))
}

export default types;