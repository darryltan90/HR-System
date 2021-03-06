//used to manage api calls
import axios from 'axios'
import { DELETE_LEAVE, GET_LEAVES, GET_LEAVE, POST_LEAVE, GET_LEAVES_BY_STATUS } from "./types";

//Add new leave---------------------------------------------------------
export const addLeave = (leaveDetails, history) => async dispatch => {
	//try {
	console.log("addLeave leaveDetails:: ", leaveDetails)
	const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/employee/add", leaveDetails)
	console.log('addLeave res:: ', res)
	dispatch({ type: POST_LEAVE, payload: res.data });

	if (history) {
		history.push("/employee/leave/")
	}
}

//Get all leaves according to employee id--------------------------------------------------------
export const getEmpLeaves = (empId) => async dispatch => {
	const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/employee/allLeaves/${empId}`)
	dispatch({ type: GET_LEAVES, payload: res.data })
}

//Delete leave----------------------------------------------------------
export const deleteLeave = (leaveId, empId) => async dispatch => {
	await axios.delete(`http://localhost:8080/hrsystemApi/leaves/employee/deleteById/${empId}/${leaveId}`)//delete by id
	dispatch({ type: DELETE_LEAVE, payload: leaveId })
}

// dispatch leave details to redux
export const getLeave = leaveDetails => {
	return { type: GET_LEAVE, payload: leaveDetails }
}

// get leaves for calendar
export const getLeaveByStatus = (status) => async dispatch => {
	const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/employee/getByStatus/${status}`)
	dispatch({ type: GET_LEAVES_BY_STATUS, payload: res.data })
}