import axios from 'axios'
import { POST_EMP, GET_ALL_EMP, DELETE_EMP, GET_EMP } from "./types";

// Add/Update employee
export const addEmp = (employeeDetails, history) => async dispatch => {
	console.log('addEmp employeeDetails::', employeeDetails)
	console.log('addEmp history::', history)
	//return
	const res = await axios.post("http://localhost:8080/hrsystemApi/employees/admin/add", employeeDetails)
	console.log('addEmp res::', res)
	dispatch({ type: POST_EMP, payload: res.data })

	// return(
	//    <Redirect to='admin/employee' />
	// )
	if (history) {
		history.push('/admin/employees')
	}
}

// Get all employees
export const getAllEmp = () => async dispatch => {
	const res = await axios.get('http://localhost:8080/hrsystemApi/employees/admin/allEmployees')
	dispatch({ type: GET_ALL_EMP, payload: res.data })
}

// Delete employee (backend not done)(do not use yet)
export const deleteEmp = (empId) => async dispatch => {
	console.log('deleteEmp empId:::', empId)
	//return
	await axios.delete(`http://localhost:8080/hrsystemApi/employees/admin/deleteEmployee/${empId}`)
	dispatch({ type: DELETE_EMP, payload: empId })
}

// dispatches whole employee to redux to be used by
export const getEmp = employeeDetails => {
	return { type: GET_EMP, payload: employeeDetails }
}