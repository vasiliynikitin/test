import mock from "./mock";

// апи сервера у нас нет, поэтому для девелопмента будет мок,
// а для тестов - fetch, потому что тесты будут мокать сами.
// по сути в норме должен быть лишь один fetch для всего.
const _fetch = process.env.APP_ENV === 'test'
  ? ({ url, ...params }) => fetch(url, params).then(res => res.json())
  : mock;

function login(body) {
  const { login, password } = body;
  if (!login || !password) {
    return Promise.reject();
  }
  
  return _fetch({
    url: '/users/login',
    method: 'POST',
    body,
  });
}

function logout() {
  return _fetch({
    url: '/users/logout',
    method: 'POST',
  });
}

function profile() {
  return _fetch({
    url: '/users/current',
  });
}

export default {
  request: {
    login,
    logout,
    profile,
  }
}