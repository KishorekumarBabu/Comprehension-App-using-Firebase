import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const ResultsSummary = ({ userId, result }) => {
  return (
    <div className="card z-depth-0 project-summary" key={result}>
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{result.passageId}</span>
        <span className="card-title right">{result.scorePercentage}%</span>
      </div>
      <div className="card-action">
        <Link
          className="take-quiz-link"
          to={"/user/" + userId + "/result/passage/" + result.passageId}
        >
          SEE RESULT
        </Link>
      </div>
    </div>
  );
};

export default ResultsSummary;
