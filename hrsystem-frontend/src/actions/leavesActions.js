//used to manage api calls
import axios from 'axios'
import { DELETE_LEAVE, GET_LEAVES, GET_LEAVE, POST } from "./types";

//Add new leave---------------------------------------------------------
export const addLeave = (leave, history) => async dispatch => {
   //try {
   const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/add", leave)
   console.log('res :: ', res)
   dispatch({ type: POST, payload: res.data });

   if (history) {
      history.push("/employee/leave")
   }
}

//Get all leaves--------------------------------------------------------
export const getLeaves = () => async dispatch => {
   const res = await axios.get("http://localhost:8080/hrsystemApi/leaves/allLeaves")
   dispatch({
      type: GET_LEAVES,
      payload: res.data
   })
}

//Delete leave----------------------------------------------------------
export const deleteLeave = leave_id => async dispatch => {
   if (
      window.confirm(
         `You are deleting leave ${leave_id}, this action cannot be undone`
      )
   ) {
      await axios.delete(`http://localhost:8080/hrsystemApi/leaves/delete${leave_id}`)
      dispatch({
         type: DELETE_LEAVE,
         payload: leave_id
      })
   }
}

//Update leave----------------------------------------------------------
export const getLeave = (leave_id, history) => async dispatch => {
   try {
      const res = await axios.get(`http://localhost:8080/hrsystemApi/leaves/get${leave_id}`)
      dispatch({
         type: GET_LEAVE,
         payload: res.data
      })
   } catch (error) {
      history.push("/")
   }
}