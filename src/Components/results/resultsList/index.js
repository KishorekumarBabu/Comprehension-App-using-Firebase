import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { currentPage } from "../../../store/actions/pageActions";
import { Redirect } from "react-router-dom";
import Preloader from "../../layout/preloader";

import "./index.css";

class ResultsList extends Component {
  componentDidMount() {
    this.props.currentPage("RESULT_LIST");
  }

  render() {
    const { resultList, userId } = this.props;
    if (!userId) return <Redirect to="/signin" />;

    if (resultList && Object.entries(resultList).length) {
      return (
        <div className="results container">
          <div className="row row-results">
            <div className="col s12">
              <div className="result-list section">
                {resultList &&
                  Object.keys(resultList).map(passageId => {
                    return (
                      <div
                        className="card z-depth-0 project-summary"
                        key={passageId}
                      >
                        <div className="card-content grey-text text-darken-3">
                          <span className="card-title result-list-title">
                            {resultList[passageId].passageTitle}
                          </span>
                          <span className="card-title result-list-title right">
                            {resultList[passageId].scorePercentage}%
                          </span>
                          <p>{resultList[passageId].timeStamp}</p>
                        </div>

                        <div className="card-action">
                          <Link
                            className="take-quiz-link"
                            to={
                              "/user/" + userId + "/result/passage/" + passageId
                            }
                          >
                            SEE RESULT
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="results container">
          <div className="row row-results">
            <div className="col s12">
              <div className="result-list section">
                <div className="card z-depth-0 project-summary">
                  <div className="card-content grey-text text-darken-3 center">
                    Here You'll be able to view all you past attempts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const userId = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const resultList = users && users[userId] ? users[userId].results : null;
  const passage = state.firestore.data.comprehension;

  return {
    resultList,
    userId,
    passage
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
  firestoreConnect([{ collection: "users" }])
)(ResultsList);
