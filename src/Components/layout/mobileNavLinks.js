import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import M from "materialize-css";

class MobileNavLinks extends Component {
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
  }

  render() {
    const { auth } = this.props;

    return (
      <div
        className="sidenav"
        id="slide-out"
        ref={sidenav => {
          this.sidenav = sidenav;
        }}
      >
        {auth.uid ? (
          <ul>
            <li>
              <div className="user-view">
                <div className="background">
                  <img
                    src="https://materializecss.com/images/office.jpg"
                    alt=""
                  />
                </div>
                <a href="#user">
                  <i className="medium material-icons">account_circle</i>
                </a>
                <a href="#name">
                  <span className="white-text name">
                    {auth.email.slice(0, -10)}
                  </span>
                </a>
                <a href="#email">
                  <span className="white-text email">{auth.email}</span>
                </a>
              </div>
            </li>
            <li>
              <NavLink className="sidenav-close" to={"/user/" + auth.uid}>
                <i className="material-icons prefix">home</i>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="sidenav-close"
                to={"/user/" + auth.uid + "/createPassage"}
              >
                <i className="material-icons prefix">mode_edit</i>
                Create Passage
              </NavLink>
            </li>
            <li>
              <NavLink
                className="sidenav-close"
                to={"/user/" + auth.uid + "/result"}
              >
                Results
              </NavLink>
            </li>
            <li>
              <a className="sidenav-close" onClick={this.props.signOut}>
                Log Out
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink className="sidenav-close" to="/signup">
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink className="sidenav-close" to="/signin">
                Log In
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MobileNavLinks);
