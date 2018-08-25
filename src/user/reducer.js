import types from './actions';

const initialState = {
    login: null,
    isLoaded: false,
};

export default function userReducer(state = initialState, { type, data }) {
  switch (type) {
    case types.SET:
      return Object.assign({}, state, { isLoaded: true, login: data.login || null });
    default:
      return state;
  }
}
