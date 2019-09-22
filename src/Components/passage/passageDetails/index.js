import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Quiz from "../../quiz";
import M from "materialize-css";
import { currentPage } from "../../../store/actions/pageActions";
import { Redirect } from "react-router-dom";
import Preloader from "../../layout/preloader";
import "./index.css";

class PassageDetails extends Component {
  componentDidMount() {
    this.props.currentPage("PASSAGE_DETAILS");
    M.Tabs.init(this.Tabs);
  }

  render() {
    const { passage, timerDetails, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (passage) {
      return (
        <div>
          <div className="navbar-fixed">
            <ul
              ref={Tabs => {
                this.Tabs = Tabs;
              }}
              className="tabs tabs-fixed-width z-depth-1"
            >
              <li className="tab">
                <a href="#passage">Passage</a>
              </li>
              <li className="tab">
                <a href="#quiz">Quiz</a>
              </li>
            </ul>
          </div>

          <div className="row tabs-passage">
            <div id="passage" className="col s12 passage">
              <div className="container section paragraph">
                <div className="card z-depth-0">
                  <div className="card-content">
                    {timerDetails.timerIsOn ? (
                      <div>
                        <span className="card-title center">
                          {passage.title}
                        </span>
                        <p>{passage.paragraph}</p>
                      </div>
                    ) : (
                      <div className="container text-center">
                        Click the Play button above to resume
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row tabs-passage">
            <div id="quiz" className="col s12">
              <div className="container section quiz">
                <div className="card z-depth-0">
                  <div className="card-content">
                    <Quiz timerDetails={timerDetails} passage={passage} />
                  </div>
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
  const passages = state.firestore.ordered.comprehension;
  const passage = passages
    ? passages.find(passage => {
        return passage.id === passageId;
      })
    : null;

  return {
    passage,
    timerDetails: state.timer,
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
)(PassageDetails);
