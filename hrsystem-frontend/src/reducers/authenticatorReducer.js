import { GET_ADMIN_ID, GET_EMP_ID, } from "../actions/types";

const initialState = {
   isLoggedIn={
      admin = {},
      employee = {}
   }
}

// log in reducer
export default function (state = initialState, action) {
   switch (action.type) {
      case GET_ADMIN_ID:
         return {
            ...state,
            admin: action.payload
         }
      case GET_EMP_ID:
         return {
            ...state,
            employee: action.payload
         }
   }
}