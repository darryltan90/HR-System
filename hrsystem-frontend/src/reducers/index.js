//all reducers

import { combineReducers } from "redux";
import leavesReducer from "./leavesReducer";
import authenticatorReducer from "./authenticatorReducer";


export default combineReducers({
   //authenticator: authenticatorReducer,
   auth: authenticatorReducer,
   leave: leavesReducer
})