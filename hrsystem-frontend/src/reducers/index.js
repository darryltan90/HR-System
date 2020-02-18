//all reducers

import { combineReducers } from "redux";
//import errorsReducers from "./errorsReducers";
import leavesReducer from "./leavesReducer";


export default combineReducers({
   leave: leavesReducer
})