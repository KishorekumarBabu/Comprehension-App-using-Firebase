const initState = {};

const contestantReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_CONTESTANT':
      console.log('created Contestant', action.contestant)
      return state;
  
    default:
        return state;
  }
  
}

export default contestantReducer