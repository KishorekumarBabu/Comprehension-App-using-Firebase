import React from 'react';

const ContestantSummary = ({contestant}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{contestant.firstName}</span>
        <p>{contestant.role}</p>
        <p className="grey-text"> 21st June </p>
      </div>
    </div>
  )
}

export default ContestantSummary;