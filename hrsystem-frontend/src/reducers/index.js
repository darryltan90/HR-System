//all reducers

import { combineReducers } from "redux";
import leavesReducer from "./leavesReducer";


export default combineReducers({
   //authenticator: authenticatorReducer,
   leave: leavesReducer
})