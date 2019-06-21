import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const ContestantDetails = (props) => {
  const {contestant } =  props;
  if(contestant) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{contestant.firstName}</span>
            <p>{contestant.role}</p>
            <p>{contestant.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by Kishore</div>
            <div> 20th June </div>
          </div>
        </div>
      </div>
    )
  } else {
    return(
        <div className="container">
          <p>....Loading Contestant Details</p>
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const contestants =  state.firestore.data.contestants;
  const contestant = contestants ? contestants[id] : null;

  return {
    contestant
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'contestants'
  }])
)(ContestantDetails);
