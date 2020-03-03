import axios from 'axios'
import { GET_ADMIN_DETAILS, GET_EMP_DETAILS } from "./types";

export const getEmpDetails = (empName, history) => async dispatch => {
   try {

      const formData = new FormData()
      formData.append("empName", empName)
      const res = await axios.post(
         `http://localhost:8080/hrsystemApi/authenticator/login`, formData
      )
      //dispatch is to send to redux
      if (history && res.data != "") {
         console.log("test1")
         //debugger;
         dispatch({
            type: GET_EMP_DETAILS,
            payload: res.data
         })
         console.log(res.data)
         history.push("/employee/leave")
      }


   } catch (error) {
      //no errors will be sent back???
   }

}
export const resetReduxStore = () => dispatch => {
   dispatch({ type: GET_EMP_DETAILS, payload: {} })
}

// export const resetReduxStore = () => {
//    return dispatch => {
//       return (
//          dispatch({ type: GET_EMP_DETAILS, payload: {} }),
//          dispatch({ type: GET_ADMIN_DETAILS, payload: {} })
//       )

//    }
// }
