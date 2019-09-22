export const setTimerDetails = timerDetails => {
  return dispatch => dispatch({ type: "TIMER_DETAILS", timerDetails });
};
