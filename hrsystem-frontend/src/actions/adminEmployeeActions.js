import axios from 'axios'
import { POST_EMP, GET_ALL_EMP, DELETE_EMP } from "./types";

// Add/Update employee
export const addEmp = (employee, history) => async dispatch => {
   console.log('addEmp employee::', employee)
   console.log('addEmp history::', history)
   //return
   const res = await axios.post("http://localhost:8080/hrsystemApi/employees/admin/add", employee)
   console.log('addLeave res::', res)
   dispatch({ type: POST_EMP, payload: res.data })

   if (history) {
      history.push('admin/employee')
   }
}

// Get all employees
export const getAllEmp = () => async dispatch => {
   const res = await axios.get('http://localhost:8080/hrsystemApi/employees/admin/allEmployees')
   dispatch({ type: GET_ALL_EMP, payload: res.data })
}

// Delete employee (backend not done)(do not use yet)
export const deleteEmp = (empId) => async dispatch => {
   await axios.delete(`http://localhost:8080/hrsystemApi/employees/admin/deleteEmployee/${empId}`)
   dispatch({ type: DELETE_EMP, payload: empId })
}