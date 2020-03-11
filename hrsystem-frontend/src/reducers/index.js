//all reducers

import { combineReducers } from "redux";
import leavesReducer from "./leavesReducer";
import authenticatorReducer from "./authenticatorReducer";
import employeesReducer from "./employeesReducer";


export default combineReducers({
	//authenticator: authenticatorReducer,
	auth: authenticatorReducer,
	reduxLeave: leavesReducer,
	reduxEmployee: employeesReducer
})