import React from 'react';
import {connect} from 'react-redux';

import Navigation from '../components/Navigation';

const NavbarContainer = (props) => {
  return (
    <div className='layout-navbar'>
      <Navigation />
      <div className='login-panel'>
        { !props.user &&
        <button><i className="fa fa-user-times icon-user--loggedout" aria-hidden="true"></i></button> }
        { props.user &&
        <button><i className="fa fa-user icon-user--loggedin" aria-hidden="true"></i></button> }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(NavbarContainer);
