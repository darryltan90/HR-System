import axios from 'axios'
import { GET_EMP_DETAILS, USER_LOGOUT } from "./types";

export const getEmpDetails = (empName, password, history) => async dispatch => {
	try {
		const formData = new FormData()
		formData.append("empName", empName)
		formData.append("password", password)
		const res = await axios.post(
			`http://localhost:8080/hrsystemApi/authenticator/login`, formData
		)
		//dispatch is to send to redux
		if (history && res.data !== "") {
			dispatch({
				type: GET_EMP_DETAILS,
				payload: res.data
			})

			history.push("/employee/leave")
		}


	} catch (error) {
		//no errors will be sent back???
	}

}
export const resetReduxStore = () => dispatch => {
	dispatch({ type: USER_LOGOUT })
}
