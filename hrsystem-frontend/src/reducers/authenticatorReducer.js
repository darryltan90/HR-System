import { GET_ADMIN_DETAILS, GET_EMP_DETAILS } from "../actions/types";

const initialState = {
   employee: {},
   admin: {}
}

// push data to redux store
export default function (state = initialState, action) {
   switch (action.type) {
      case GET_ADMIN_DETAILS:
         return {
            ...state,
            admin: action.payload
         }
      case GET_EMP_DETAILS:
         console.log('action :: ', action)
         return {
            ...state,
            employee: action.payload
         }

      default:
         return state
   }
}