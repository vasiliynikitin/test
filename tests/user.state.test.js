import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types, * as actions from '../src/user/actions';
import fetchMock from 'fetch-mock';
import expect from 'expect'; // You can use any testing library
import userReducer from '../src/user/reducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const login = '<Login>';
const setUserAction = { type: types.SET, data: { login } };
const resetUserAction = { type: types.SET, data: { } };

describe('user actions', async () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('get current on guest user', () => {
    const store = mockStore();
    fetchMock.getOnce('/users/current', { body: { } });

    return store.dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual([resetUserAction]);
      });
  });

  
  it('Logins user', () => {
    const store = mockStore();

    fetchMock.postOnce('/users/login', { body: { login } });

    return store.dispatch(actions.login({ login, password: 'password' }))
      .then(() => {
        expect(store.getActions()).toEqual([setUserAction]);
      });
  });

  it('Logouts user', () => {
    const store = mockStore();

    fetchMock.postOnce('/users/logout', { body: {} });

    return store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual([resetUserAction]);
      });
  });

});

describe('user reducer', async () => {
  let state;

  beforeEach(() => {
    state = userReducer(undefined, { type: '@@INIT'});
  });

  it('sets isLoaded flag', () => {
    state = userReducer(state, setUserAction);
    expect(state.isLoaded).toBe(true);
  });
  it('sets user', () => {
    state = userReducer(state, setUserAction);
    expect(state.login).toBe(login);
  });
  it('resets user', () => {
    state = userReducer(state, setUserAction);
    state = userReducer(state, resetUserAction);
    expect(state.login).toBe(null);
  });
});