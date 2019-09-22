export const submitAnswers = (resultDetails, userId, passageId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .update({ [`results.${passageId}`]: resultDetails })
      .then(() => {
        dispatch({
          type: "QUIZ_STATUS",
          quizStatus: "QUIZ_SUBMITTED_SUCCESSFULLY"
        });
      })
      .catch(err => {
        dispatch({ type: "QUIZ_STATUS", quizStatus: "QUIZ_SUBMIT_ERROR" });
      });
  };
};

export const quizStatus = quizStatus => {
  return dispatch => dispatch({ type: "QUIZ_STATUS", quizStatus });
};
