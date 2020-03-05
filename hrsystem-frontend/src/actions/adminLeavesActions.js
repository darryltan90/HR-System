import axios from 'axios'


export const updateLeaveStatus = (leave, history) => async dispatch => {
   //try {
   const res = await axios.post("http://localhost:8080/hrsystemApi/leaves/employee/add", leave)
   console.log('res :: ', res)
   dispatch({ type: 'POST', payload: res.data });
}