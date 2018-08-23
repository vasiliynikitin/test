import mock from "./mock";

function login(data) {
  const { login, password } = data;
  if (!login || !password) {
    return Promise.reject();
  }
  
  return mock({
    url: '/users/login',
    method: 'POST',
    data,
  });
}

function logout() {
  return mock({
    url: '/users/logout',
    method: 'POST',
  });
}

function profile() {
  return mock({
    url: '/users/current',
  });
}

export default {
  request: {
    login, // /users/logon
    logout, // /users/logout
    profile, // .
  }
}