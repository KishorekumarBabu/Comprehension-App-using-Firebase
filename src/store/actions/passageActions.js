export const createPassage = passage => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("comprehension")
      .add({
        ...passage,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PASSAGE", passage });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PASSAGE_ERROR", passage });
      });
  };
};
