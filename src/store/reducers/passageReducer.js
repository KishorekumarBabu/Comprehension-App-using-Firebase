const initState = {};

const passageReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PASSAGE":
      console.log("created Passage", action.passage);
      return state;

    case "CREATE_PASSAGE_ERROR":
      console.log("Create Passage Error", action.passage);
      return state;

    default:
      return state;
  }
};

export default passageReducer;
