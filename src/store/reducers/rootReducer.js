import authReducer from './authReducer';
import contestantReducer from './contestantReducer';
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  contestant: contestantReducer,
  firestore: firestoreReducer
});

export default rootReducer;