let currentUser = null;
const users = [
  { login: 'login', password: 'password'},
  { login: 'user', password: 'qwerty'},
];

const guestUser = () => null;
const loginUser = ({ login }) => ({ login });

currentUser = guestUser();

function getProfile() {
  return new Promise((resolve, reject) => {
    if (currentUser) {
      resolve(currentUser);
    } else {
      reject();
    }
  });
}

function login({ login, password}) {
  const user = users.find(item => login === item.login && password === item.password);
  currentUser = user ? loginUser(user) : guestUser();
  return getProfile();
}

function logout() {
  currentUser = guestUser();
}

const api = [
  { url: '/users/current', method: 'GET', callback: getProfile },
  { url: '/users/login', method: 'POST', callback: login },
  { url: '/users/logout', method: 'POST', callback: logout },
];

const mock = function({ url, method = 'get', data }) {
  const apiMethod = api.find(({ url: apiUrl, method: httpMethod }) => url === apiUrl && method.toUpperCase() === httpMethod);
  return new Promise((resolve) => { setTimeout(resolve, 1000);})
    .then(() => apiMethod
        ? apiMethod.callback(data)
        : Promise.reject({ error: `Api method for [${method.toUpperCase()}] '${url}' not found`})
    );
};

export default mock;