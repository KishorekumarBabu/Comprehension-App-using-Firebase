

export const createContestant = (contestant) => {
  return (dispatch, getState , { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('contestants').add({
      ...contestant,
      createdAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_CONTESTANT', contestant});
    }).catch((err) => {
      dispatch({type: 'CREATE_CONTESTANT_ERROR', contestant});
    })
    
  }
}