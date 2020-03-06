import { POST_EMP, GET_ALL_EMP, DELETE_EMP } from "../actions/types";

const initialState = {
   employees: []
}

export default function (state = initialState, action) {
   switch (action.type) {
      case POST_EMP:
         return {
            ...state,
            employees: [
               ...state.leaves.filter(
                  item => item.id !== action.payload.id
               ),
               action.payload
            ]
         }

      case GET_ALL_EMP:
         return {
            ...state,
            employees: action.payload
         }

      //no yet implemented in backend
      case DELETE_EMP:
         return {
            ...state,
            employees: state.employees.filter(
               employee => employee.id !== action.payload
            )
         }

      default:
         return state
   }
}