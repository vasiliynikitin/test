import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../user/actions';

const stateToProps = ({ user: { login } }) => ({ login });

class LogonPage extends Component {
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
  }

  render() {
    const {
      login,
    } = this.props;

    const {
      inProgress,
    } = this.state;

    return <div>
      <div>{`Welcome, ${login}!`}</div>
      <div><button disabled={inProgress} onClick={this.logout}>Logout</button></div>
    </div>;
  }
}

export default connect(stateToProps)(LogonPage)