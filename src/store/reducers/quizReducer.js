const initState = "QUIZ_NOT_STARTED";

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "QUIZ_STATUS":
      state = action.quizStatus;
      console.log("QUIZ_STATUS", state);
      return state;

    default:
      return state;
  }
};

export default quizReducer;
