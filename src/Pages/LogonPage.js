import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../user/actions';
import { parseInputChange } from '../utils';

export class LogonPage extends Component {
  state = {
    login: '',
    password: '',
    inProgress: false,
    error: false,
  };

  login = () => {
    const { login, password } = this.state;

    this.setState({ inProgress: true });
    this.props.dispatch(actions.login({ login, password }))
      .catch(() => {
        this.setState({ error: true, inProgress: false });
      });
  };

  clearLoginError() {
    const {
      error,
    } = this.state;
    if (error) {
      this.setState({ error: false });
    }
  }

  handleInputChange = (event) => {
    this.clearLoginError();
    this.setState(parseInputChange(event));
  };

  render() {
    const {
      login,
      password,
      error,
      inProgress,
    } = this.state;

    return <div>
      <div>Login</div>
      <div>
        <input
          name="login"
          value={login}
          disabled={inProgress}
          onChange={this.handleInputChange}
        />
      </div>
      <div>Password</div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          disabled={inProgress}
          onChange={this.handleInputChange}
        />
      </div>
      <div className="button"><button disabled={inProgress} onClick={this.login}>Login</button></div>
      { error && <div>Login Error!</div> }
    </div>;
  }
}

export default connect()(LogonPage);