import { GET_LEAVES, DELETE_LEAVE, GET_LEAVE, POST_LEAVE, USER_LOGOUT } from "../actions/types";

const initialState = {
   leaves: [],
   leave: {}
}

export default function (state = initialState, action) {
   switch (action.type) {
      case GET_LEAVES:
         return {
            ...state,
            leaves: action.payload
         }

      case GET_LEAVE:
         return {
            ...state,
            leave: action.payload
         }

      case DELETE_LEAVE:
         return {
            ...state,
            leaves: state.leaves.filter(
               item => item.id !== action.payload
            )
         }

      case POST_LEAVE:
         console.log('POST_LEAVE action:: ', action)
         return {
            ...state,
            leaves: [
               ...state.leaves.filter(
                  item => item.id !== action.payload.id
               ),
               action.payload
            ]
         }

      case USER_LOGOUT:
         return { ...initialState }

      default:
         return state
   }
}