import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Preloader from "../../layout/preloader";
import { currentPage } from "../../../store/actions/pageActions";

import "./index.css";

class ResultDetails extends Component {
  state = {
    currentPage: 0
  };

  componentDidMount() {
    this.props.currentPage("RESULT_DETAILS");
  }

  goToNextPage() {
    let nextpage = this.state.currentPage + 1;
    this.setState({
      currentPage: nextpage
    });
  }

  goToPreviousPage() {
    let previousPage = this.state.currentPage - 1;
    this.setState({
      currentPage: previousPage
    });
  }

  goToHome() {
    this.props.history.push("/user/" + this.props.userId);
  }

  render() {
    const { passage, resultDetails, userId } = this.props;
    if (!userId) return <Redirect to="/signin" />;

    if (passage && resultDetails) {
      return (
        <div className="row result-page">
          <div className="col s12">
            <div className="container section">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title center">Your Score:</span>
                  <h3 className="text-center">
                    {resultDetails.scorePercentage}%
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Passage Title:</td>
                        <td>{passage.title}</td>
                      </tr>
                      <tr>
                        <td>Passage Length:</td>
                        <td>{passage.paragraph.split(" ").length} words</td>
                      </tr>
                      <tr>
                        <td>Time Taken:</td>
                        <td>{resultDetails.timeTaken}</td>
                      </tr>
                      <tr>
                        <td>Correct:</td>
                        <td>
                          {resultDetails.correctOptions.length
                            ? resultDetails.correctOptions.map(
                                (correctOption, index) =>
                                  "Q" +
                                  correctOption +
                                  (index !==
                                  resultDetails.correctOptions.length - 1
                                    ? ","
                                    : "")
                              )
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Incorrect:</td>
                        <td>
                          {resultDetails.incorrectOptions.length
                            ? resultDetails.incorrectOptions.map(
                                (incorrectOption, index) =>
                                  "Q" +
                                  incorrectOption +
                                  (index !==
                                  resultDetails.incorrectOptions.length - 1
                                    ? ","
                                    : "")
                              )
                            : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="center">{resultDetails.timeStamp}</p>
                  <div className="row question-navigation">
                    <div className="col s2">
                      <button
                        className={
                          this.state.currentPage
                            ? "waves-effect waves-light btn-floating navigate_before"
                            : "hide navigate_before"
                        }
                        onClick={this.goToPreviousPage.bind(this)}
                      >
                        <i className="material-icons">navigate_before</i>
                      </button>
                    </div>
                    <div className="col s8 question-heading">
                      <span className="question-heading">
                        Question: {this.state.currentPage + 1}/
                        {passage.quiz.length}
                      </span>
                    </div>
                    <div className="col s2">
                      <button
                        className={
                          this.state.currentPage < passage.quiz.length - 1
                            ? "waves-effect waves-light btn-floating navigate_after"
                            : "hide navigate_after"
                        }
                        onClick={this.goToNextPage.bind(this)}
                      >
                        <i className="material-icons">navigate_next</i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h6>{passage.quiz[this.state.currentPage].question}</h6>

                      <h6>
                        Your Answer: {"        "}
                        {resultDetails.userOptions[this.state.currentPage] ===
                        passage.quiz[this.state.currentPage].correctOption ? (
                          <i className="material-icons correct">check</i>
                        ) : (
                          <i className="material-icons incorrect">close</i>
                        )}
                      </h6>
                      <p>{resultDetails.userOptions[this.state.currentPage]}</p>
                      <h6>Correct Answer:</h6>
                      <p>
                        {passage.quiz[this.state.currentPage].correctOption}
                      </p>
                      <h6>Explanation:</h6>
                      <p>{passage.quiz[this.state.currentPage].explanation}</p>
                    </div>
                  </div>
                </div>
                <div className="card-action result-page text-center">
                  <p>Pratice Makes Perfect!!!</p>
                  <button
                    className="waves-effect waves-light btn-floating home"
                    onClick={this.goToHome.bind(this)}
                  >
                    <i className="material-icons right">home</i>
                  </button>
                </div>
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

const mapStateToProps = (state, ownProps) => {
  const passageId = ownProps.match.params.passageId;
  const userId = state.firebase.auth.uid;
  const passage = state.firestore.data.comprehension
    ? state.firestore.data.comprehension[passageId]
    : null;
  const users = state.firestore.data.users;
  const resultDetails =
    users && users[userId] && users[userId].results
      ? users[userId].results[passageId]
      : null;

  return {
    passage,
    resultDetails,
    userId: userId
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
  firestoreConnect([{ collection: "comprehension" }, { collection: "users" }])
)(ResultDetails);
