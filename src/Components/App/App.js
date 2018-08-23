import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../user/actions';
import routes from '../../routes';
import Loader from '../Loader/Loader';

const stateToProps = ({ user }) => user;

class App extends Component {
  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    login: PropTypes.string,
  };

  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  render() {
    const {
      isLoaded,
      login,
    } = this.props;
    if (!isLoaded) {
      return <Loader />;
    }
    return routes({ login });
  }
}
  
export default connect(stateToProps)(App);