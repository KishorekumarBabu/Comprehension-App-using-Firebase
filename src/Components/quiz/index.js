import React, { Component } from "react";
import { submitAnswers, quizStatus } from "../../store/actions/quizActions";
import { currentPage } from "../../store/actions/pageActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./index.css";

class Quiz extends Component {
  state = {
    currentPage: 0,
    userOptions: [],
    answeredCount: 0,
    scorePercentage: 0,
    redirect: false
  };

  componentDidMount() {
    this.props.quizStatus("QUIZ_STARTED");
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

  setRadioValue(e) {
    let userOptions = this.state.userOptions;
    let answeredCount = 0;
    userOptions[this.state.currentPage] = e.target.value;

    for (let key in userOptions) {
      if (key) {
        answeredCount += 1;
      }
    }

    this.setState({
      userOptions,
      answeredCount
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let score = 0;
    let userOptions = this.state.userOptions;
    let passage = this.props.passage;
    let correctOptions = [];
    let incorrectOptions = [];
    let resultDetails = {};

    for (let index = 0; index < userOptions.length; index++) {
      if (this.state.userOptions[index] === passage.quiz[index].correctOption) {
        correctOptions.push(index + 1);
        score += 1;
      } else {
        incorrectOptions.push(index + 1);
      }
    }
    let scorePercentage = ((score / userOptions.length) * 100).toFixed(2);

    this.setState({
      scorePercentage,
      redirect: true
    });

    resultDetails = {
      passageTitle: passage.title,
      timeStamp: new Date().toLocaleString(),
      scorePercentage,
      userOptions,
      correctOptions,
      incorrectOptions
    };

    this.props.submitAnswers(resultDetails, this.props.auth.uid, passage.id);
  }

  render() {
    const { passage, timerDetails } = this.props;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={"/user/" + auth.uid + "/result/passage/" + passage.id}
        />
      );
    } else {
      if (timerDetails.timerIsOn) {
        return (
          <div>
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
                  Question: {this.state.currentPage + 1}/{passage.quiz.length}
                </span>
              </div>
              <div className="col s2">
                <button
                  className={
                    this.state.currentPage < passage.quiz.length - 1
                      ? "waves-effect waves-light btn-floating float-right"
                      : "hide navigate_after"
                  }
                  onClick={this.goToNextPage.bind(this)}
                >
                  <i className="material-icons">navigate_next</i>
                </button>
              </div>
            </div>
            <div className="quiz-options">
              <div className="quiz-question">
                {passage.quiz[this.state.currentPage].question}
              </div>
              <form className="radio-buttons">
                {passage.quiz[this.state.currentPage].options.map(
                  (option, index) => {
                    return (
                      <label className="radio-buttons" key={index}>
                        <input
                          className="with-gap"
                          name="group1"
                          type="radio"
                          value={option}
                          id={index}
                          onChange={this.setRadioValue.bind(this)}
                          checked={
                            this.state.userOptions[this.state.currentPage] ===
                            option
                          }
                        />
                        <span>{option}</span>
                      </label>
                    );
                  }
                )}
              </form>
            </div>

            <div className="card-action text-center">
              <button
                className={
                  this.state.currentPage === passage.quiz.length - 1
                    ? "waves-effect waves-light btn-small submit"
                    : "hide submit"
                }
                onClick={this.handleSubmit.bind(this)}
                disabled={!(this.state.answeredCount === passage.quiz.length)}
              >
                <i className="material-icons right">send</i>Submit
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container text-center">
            Click the Play button above to resume
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    timerDetails: state.timer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAnswers: (resultDetails, userId, passageId) =>
      dispatch(submitAnswers(resultDetails, userId, passageId)),
    currentPage: page => dispatch(currentPage(page)),
    quizStatus: status => dispatch(quizStatus(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
