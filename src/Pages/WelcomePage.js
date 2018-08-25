import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../user/actions';

const stateToProps = ({ user: { login } }) => ({ login });

export class WelcomePage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
  };

  state = {
    inProgress: false,
  };

  logout = () => {
    this.setState({ inProgress: true });
    this.props.dispatch(actions.logout())
      .catch(() => {
        this.setState({ inProgress: false });
      })
  };

  render() {
    const {
      login,
    } = this.props;

    const {
      inProgress,
    } = this.state;

    return <div>
      <div className="welcome">{`Welcome, ${login}!`}</div>
      <div className="button"><button disabled={inProgress} onClick={this.logout}>Logout</button></div>
    </div>;
  }
}

export default connect(stateToProps)(WelcomePage)