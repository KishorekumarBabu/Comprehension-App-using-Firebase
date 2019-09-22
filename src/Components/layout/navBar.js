import React, { Component } from "react";
import { Link } from "react-router-dom";
import Timer from "../../Components/timer";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DesktopNavLinks from "./desktopNavLinks";
import MobileNavLinks from "./mobileNavLinks";

class NavBar extends Component {
  render() {
    const { auth, user } = this.props;

    return (
      <div
        className={
          this.props.currentPage === "PASSAGE_DETAILS"
            ? "navbar-fixed"
            : "nav-bar"
        }
      >
        <nav className="nav-wrapper cyan darken-3">
          {this.props.currentPage === "PASSAGE_DETAILS" ? (
            <div className="container">
              <Link className="float-left" to={"/user/" + auth.uid}>
                <i className="material-icons">arrow_back</i>
              </Link>
              <Timer />
            </div>
          ) : (
            <div className="container">
              <Link to={"/user/" + auth.uid} className="brand-logo">
                GRE Prep
              </Link>
              <a
                href="#menu"
                className="sidenav-trigger"
                data-target="slide-out"
              >
                <i className="material-icons">menu</i>
              </a>
              <DesktopNavLinks auth={auth} user={user} />
              <MobileNavLinks auth={auth} user={user} />
            </div>
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const user = state.firestore.data.users
    ? state.firestore.data.users[auth.uid]
    : null;

  return {
    user,
    auth,
    currentPage: state.page
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(NavBar);
