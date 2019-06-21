import React from 'react';
import ContestantSummary from './contestantSummary';
import { Link } from 'react-router-dom';;

const ContestantList = ({contestants}) => {
  return (
      <div className="project-list section">
        {contestants && contestants.map(contestant => {
          return (
            <Link to={'/contestant/' + contestant.id}>
              <ContestantSummary contestant={contestant} key = {contestant.id}/>
            </Link>
          )
        })} 
      </div>
  )
}

export default ContestantList;