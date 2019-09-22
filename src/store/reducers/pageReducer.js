const initState = {
  timerDetails: {
    timerIsOn: false
  }
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case "CURRENT_PAGE":
      state = action.page;
      console.log("CURRENT_PAGE", state);
      return state;

    default:
      return state;
  }
};

export default pageReducer;
