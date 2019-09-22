import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const DesktopNavLinks = props => {
  const { auth, user } = props;

  return (
    <div className="hide-on-med-and-down right">
      {auth.uid && user ? (
        <ul>
          <li>
            <NavLink to={"/user/" + auth.uid + "/createPassage"}>
              Create Passage
            </NavLink>
          </li>
          <li>
            <NavLink to={"/user/" + auth.uid + "/result"}>Results</NavLink>
          </li>
          <li>
            <a onClick={props.signOut}>Log Out</a>
          </li>
          <li>
            <NavLink
              to={"/user/" + auth.uid}
              className="btn btn-floating grey lighten -1"
            >
              {user.initials}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink to="/signup">SignUp</NavLink>
          </li>
          <li>
            <NavLink to="/signin">Log In</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DesktopNavLinks);
