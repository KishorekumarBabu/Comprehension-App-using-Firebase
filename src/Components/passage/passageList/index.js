import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { currentPage } from "../../../store/actions/pageActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Preloader from "../../layout/preloader";

import "./index.css";

class PassageList extends Component {
  componentDidMount() {
    this.props.currentPage("PASSAGE_LIST");
  }

  render() {
    const { passages, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    if (passages) {
      return (
        <div className="passage container">
          <div className="row row-passage">
            <div className="col s12">
              <div className="project-list section">
                {passages &&
                  passages.map(passage => {
                    return (
                      <div
                        className="card z-depth-0 project-summary"
                        key={passage.id}
                      >
                        <div className="card-content grey-text text-darken-3">
                          <span className="card-title">{passage.title}</span>
                          <p className="passage-content">{passage.paragraph}</p>
                        </div>
                        <div className="card-action">
                          <Link
                            className="take-quiz-link"
                            to={"/user/" + auth.uid + "/passage/" + passage.id}
                          >
                            TAKE QUIZ
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
)(PassageList);
