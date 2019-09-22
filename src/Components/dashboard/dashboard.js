import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { currentPage } from "../../store/actions/pageActions";
import Preloader from "../layout/preloader";

import "./index.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.currentPage("DASHBOARD");
  }

  render() {
    const { auth, passages } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    if (passages) {
      return (
        <div className="dashboard">
          <div className="row">
            <div className="dashboard col s12 m6">
              <div>
                <Link
                  className="btn-floating  btn-large cyan darken-3"
                  to={"/user/" + auth.uid + "/passage/"}
                >
                  <i className="material-icons ">view_list</i>
                </Link>
                <p className="dashboard-text">View List</p>
              </div>
              <div>
                <Link
                  className="btn-floating  btn-large cyan darken-3"
                  to={
                    "/user/" +
                    auth.uid +
                    "/passage/" +
                    passages[
                      Math.floor(Math.random() * Math.floor(passages.length))
                    ].id
                  }
                >
                  <i className="material-icons">play_arrow</i>
                </Link>
                <p className="dashboard-text">Practice</p>
              </div>

              <div>
                <Link
                  className="btn-floating btn-large cyan darken-3"
                  to={"/user/" + auth.uid + "/result"}
                >
                  <i className="material-icons ">show_chart</i>
                </Link>
                <p className="dashboard-text">Stats</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Preloader />;
    }
  }
}

const mapStateToProps = state => {
  return {
    passages: state.firestore.ordered.comprehension,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentPage: page => dispatch(currentPage(page))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "comprehension" }])
)(Dashboard);
