import quizReducer from "./quizReducer";
import pageReducer from "./pageReducer";
import timerReducer from "./timerReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  quizDetails: quizReducer,
  page: pageReducer,
  timer: timerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
