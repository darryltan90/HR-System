import axios from 'axios'
import { GET_LEAVES } from './types';


export const updateLeaveStatus = (leaveDetails, history) => async dispatch => {
	//try {
	const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/employee/add", leaveDetails)
	console.log('res :: ', res)
	dispatch({ type: 'POST_LEAVE', payload: res.data });
}


//Get all leaves--------------------------------------------------------
export const getLeaves = () => async dispatch => {
	const res = await axios.get("http://localhost:8080/hrsystemApi/leaves/admin/allLeaves")
	dispatch({
		type: GET_LEAVES,
		payload: res.data
	})
}