//used to manage api calls
import axios from 'axios'
import { DELETE_LEAVE, GET_LEAVES, GET_LEAVE, POST } from "./types";

//Add new leave---------------------------------------------------------
export const addLeave = (leave, history) => async dispatch => {
   //try {
   const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/employee/add", leave)
   console.log('res :: ', res)
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

//Delete leave----------------------------------------------------------
export const deleteLeave = (leaveId, empId, userType) => async dispatch => {

   let payloadObj = {
      leaveId: leaveId,
      empId: empId
   };

   if (
      window.confirm(
         `You are deleting leave ${leaveId}, this action cannot be undone`
      )
   ) {
      await axios.delete(`http://localhost:8080/hrsystemApi/leaves/${userType}/deleteById/${leaveId}`)//delete by id
      dispatch({
         type: DELETE_LEAVE,
         payload: payloadObj
      })
      alert(deleteById);

      // return await axios({
      //    url: 'http://localhost:8080/hrsystemApi/leaves/employee/deleteLeave' + leaveId,
      //    method: 'DELETE'
      // })
   }
}

//Update leave----------------------------------------------------------
export const getLeave = (leaveId, history) => async dispatch => {
   try {
      const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/${leaveId}`)//get by id
      dispatch({
         type: GET_LEAVE,
         payload: res.data
      })
   } catch (error) {
      history.push("/")
   }
}