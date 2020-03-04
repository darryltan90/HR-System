//used to manage api calls
import axios from 'axios'
import { DELETE_LEAVE, GET_LEAVES, GET_LEAVE, POST } from "./types";

//Add new leave---------------------------------------------------------
export const addLeave = (leave, history) => async dispatch => {
   //try {
   console.log("addLeave leave:: ", leave)
   const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/employee/add", leave)
   console.log('addLeave res:: ', res)
   dispatch({ type: POST, payload: res.data });

   if (history) {
      history.push("/employee/leave")
   }
}

//Get all leaves--------------------------------------------------------
export const getLeaves = () => async dispatch => {
   const res = await axios.get("http://localhost:8080/hrsystemApi/leaves/admin/allLeaves")
   dispatch({
      type: GET_LEAVES,
      payload: res.data
   })
}

//Get all leaves according to employee id--------------------------------------------------------
export const getEmpLeaves = (empId) => async dispatch => {
   const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/employee/allLeaves/${empId}`)
   dispatch({
      type: GET_LEAVES,
      payload: res.data
   })
}

//Delete leave----------------------------------------------------------
export const deleteLeave = (leaveId, empId, userType) => async dispatch => {
   await axios.delete(`http://localhost:8080/hrsystemApi/leaves/${userType}/deleteById/${empId}/${leaveId}`)//delete by id
   dispatch({
      type: DELETE_LEAVE,
      payload: leaveId
   })
}

//Update leave----------------------------------------------------------
export const getLeave = (empId, leaveId, history) => async dispatch => {
   console.log("empId::: ", empId)
   console.log("leaveId::: ", leaveId)
   try {
      const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/employee/getLeave/${empId}/${leaveId}`)
      dispatch({
         type: GET_LEAVE,
         payload: res.data
      })
      console.log("getLeave res::: ", res)
   } catch (error) {
      //history.push("/")
      console.log(error)
   }
}