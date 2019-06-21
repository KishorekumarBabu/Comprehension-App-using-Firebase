import React, { Component } from 'react';
import Notifications from "./Notification";
import ContestantList from '../contestants/contestantsList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


class Dashboard extends Component {


  render() {
    const { contestants } = this.props;

    return (
      <div className=" dashboard container">
        <div className="row">
          <div className="col s12 m6">
          <h5 className="red-text text-darken-3">Contestant List</h5>
            <ContestantList contestants={contestants} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    contestants: state.firestore.ordered.contestants
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'contestants' }
  ])
)(Dashboard);