import axios from 'axios'
import { GET_ADMIN_ID, GET_EMP_ID } from "./types";

export const getAdmin = (admin_id, password, history) => async dispatch => {
   try {
      const res = await axios.get(`http://localhost:8080/hrsystemApi/authenticator/admin/${admin_id}/${password}`)
      dispatch({
         type: GET_ADMIN_ID,
         payload: res.data
      })
   } catch (error) {
      history.push('/')
   }
}

