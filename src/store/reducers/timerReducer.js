const initState = {};

const timerReducer = (state = initState, action) => {
  switch (action.type) {
    case "TIMER_DETAILS":
      state = action.timerDetails;
      console.log("TIMER_DETAILS", state);
      return state;

    default:
      return state;
  }
};

export default timerReducer;
