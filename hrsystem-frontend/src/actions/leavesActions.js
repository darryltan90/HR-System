//used to manage api calls
import axios from 'axios'
import { GET_ERRORS, DELETE_LEAVE, GET_LEAVES, GET_LEAVE } from "./types";

//Add new leave---------------------------------------------------------
export const addLeave = (leave, history) => async dispatch => {
   //try {
   await axios.post("http://localhost:8080/hrsystemApi/leaves/add", leave)
   history.push("/")

   // clear out payload for error each time as it will stay in the state
   //    dispatch({
   //       type: GET_ERRORS,
   //       payload: {}
   //    })
   // } catch (error) {
   //    // only gets the error message
   //    dispatch({
   //       type: GET_ERRORS,
   //       payload: error.response.data
   //    })
   //}
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