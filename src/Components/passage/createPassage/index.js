import React, { Component } from "react";
import { connect } from "react-redux";
import { createPassage } from "../../../store/actions/passageActions";
import { Redirect } from "react-router-dom";
import "./index.css";

class CreatePassage extends Component {
  state = {
    title: "",
    paragraph: "",
    quiz: [
      {
        question: "",
        options: ["", ""],
        correctOption: "",
        explanation: ""
      }
    ]
  };

  handleQuizChange = (event, quizIndex) => {
    event.persist();

    this.setState(prevState => {
      let quiz = [...prevState.quiz];

      quiz[quizIndex] = {
        ...quiz[quizIndex],
        [event.target.id]: event.target.value
      };
      return { quiz };
    });
  };

  handleOptionsChange = (event, quizIndex, optionIndex) => {
    event.persist();

    this.setState(prevState => {
      let quiz = [...prevState.quiz];
      let options = [...prevState.quiz[quizIndex].options];

      options[optionIndex] = event.target.value;
      quiz[quizIndex] = { ...quiz[quizIndex], options: options };
      return { quiz };
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.props.createPassage(this.state);
    this.props.history.push("/user/" + this.props.auth.uid);
  };

  addQuiz = event => {
    event.preventDefault();

    this.setState(prevState => ({
      quiz: [
        ...prevState.quiz,
        {
          question: "",
          options: ["", ""],
          correctOption: "",
          explanation: ""
        }
      ]
    }));
  };

  deleteQuiz = (event, quizIndex) => {
    event.preventDefault();

    this.setState(prevState => {
      let quiz = [...prevState.quiz];
      quiz = quiz.filter((quiz1, index) => {
        return index !== quizIndex;
      });
      return { quiz };
    });
  };

  addOptions = (event, quizIndex) => {
    event.preventDefault();

    this.setState(prevState => {
      let quiz = [...prevState.quiz];
      let options = [...prevState.quiz[quizIndex].options, ""];

      quiz[quizIndex] = { ...quiz[quizIndex], options: options };
      return { quiz };
    });
  };

  deleteOption = (event, quizIndex, optionIndex) => {
    event.preventDefault();
    event.persist();

    this.setState(prevState => {
      let quiz = [...prevState.quiz];
      let options = [...prevState.quiz[quizIndex].options];
      options = options.filter((option, index) => {
        return index !== optionIndex;
      });
      quiz[quizIndex] = { ...quiz[quizIndex], options: options };
      return { quiz };
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="create-passage section">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title center">
                    {" "}
                    Create Comprehension{" "}
                  </span>
                  <form onSubmit={this.handleSubmit} className="white">
                    <div className="input-field">
                      <label
                        htmlFor="title"
                        data-error="Please Enter Title"
                        data-success="right"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        required
                        aria-required="true"
                        className="validate"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">mode_edit</i>
                      <label htmlFor="paragraph">Passage</label>
                      <textarea
                        id="paragraph"
                        className="materialize-textarea"
                        required
                        aria-required="true"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.quiz.map((el, quizIndex) => (
                      <ul key={quizIndex}>
                        <li className="delete-options">
                          <h6>{quizIndex + 1}. Quiz</h6>
                          <div className="right-align">
                            {this.state.quiz.length > 1 ? (
                              <button
                                className="btn-floating add-option-btn red"
                                onClick={event =>
                                  this.deleteQuiz(event, quizIndex)
                                }
                              >
                                <i className="material-icons">remove</i>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="input-field">
                            <label htmlFor={"question-" + quizIndex}>
                              Question
                            </label>
                            <input
                              type="text"
                              id={"question-" + quizIndex}
                              required
                              aria-required="true"
                              onChange={event => {
                                event.target.id = "question";
                                this.handleQuizChange(event, quizIndex);
                              }}
                              value={this.state.quiz[quizIndex].question}
                            />
                          </div>
                        </li>

                        <li className="quiz-option">
                          {this.state.quiz[quizIndex].options.map(
                            (el, optionIndex) => (
                              <ul key={optionIndex}>
                                <li>
                                  <span className="text-bold">
                                    {optionIndex + 1}. Option
                                  </span>
                                </li>
                                <li className="delete-options">
                                  <div className="input-field">
                                    <label htmlFor="role">Options</label>
                                    <input
                                      type="text"
                                      id="options"
                                      required
                                      aria-required="true"
                                      onChange={event =>
                                        this.handleOptionsChange(
                                          event,
                                          quizIndex,
                                          optionIndex
                                        )
                                      }
                                      value={
                                        this.state.quiz[quizIndex].options[
                                          optionIndex
                                        ]
                                      }
                                    />
                                  </div>
                                  <div>
                                    {this.state.quiz[quizIndex].options.length >
                                    2 ? (
                                      <button
                                        className="btn-floating add-option-btn red"
                                        onClick={event =>
                                          this.deleteOption(
                                            event,
                                            quizIndex,
                                            optionIndex
                                          )
                                        }
                                      >
                                        <i className="material-icons">remove</i>
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                              </ul>
                            )
                          )}
                        </li>
                        <li>
                          <div>
                            <button
                              className="btn-floating add-option-btn"
                              onClick={event =>
                                this.addOptions(event, quizIndex)
                              }
                            >
                              <i className="material-icons">add</i>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="input-field">
                            <label htmlFor={"correctOption-" + quizIndex}>
                              Correct option
                            </label>
                            <input
                              type="text"
                              required
                              aria-required="true"
                              id={"correctOption-" + quizIndex}
                              onChange={event => {
                                event.target.id = "correctOption";
                                this.handleQuizChange(event, quizIndex);
                              }}
                              value={this.state.quiz[quizIndex].correctOption}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="input-field">
                            <label htmlFor={"explanation-" + quizIndex}>
                              Explanation
                            </label>
                            <input
                              type="text"
                              required
                              aria-required="true"
                              id={"explanation-" + quizIndex}
                              onChange={event => {
                                event.target.id = "explanation";
                                this.handleQuizChange(event, quizIndex);
                              }}
                              value={this.state.quiz[quizIndex].explanation}
                            />
                          </div>
                        </li>
                      </ul>
                    ))}
                    <div className="input-field">
                      <button
                        className="waves-effect waves-light btn"
                        onClick={this.addQuiz}
                      >
                        Add Quiz
                      </button>
                    </div>

                    <div className="input-field center">
                      <button
                        type="submit"
                        name="action"
                        className="btn lighten-1 z-depth-0"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPassage: passage => dispatch(createPassage(passage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePassage);
