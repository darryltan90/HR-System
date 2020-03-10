import { POST_EMP, GET_ALL_EMP, GET_EMP, DELETE_EMP } from "../actions/types";

const initialState = {
   employees: [],
   employee_details: {}
}

export default function (state = initialState, action) {
   switch (action.type) {
      case POST_EMP:
         return {
            ...state,
            employees: [
               ...state.employees.filter(
                  item => item.empId !== action.payload.empId
               ),
               action.payload
            ]
         }

      case GET_ALL_EMP:
         return {
            ...state,
            employees: action.payload
         }

      case GET_EMP:
         return {
            ...state,
            employee_details: action.payload
         }

      //no yet implemented in backend
      case DELETE_EMP:
         return {
            ...state,
            employees: state.employees.filter(
               item => item.empId !== action.payload
            )
         }

      default:
         return state
   }
}