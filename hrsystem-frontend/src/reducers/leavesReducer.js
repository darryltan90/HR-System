import { GET_LEAVES, DELETE_LEAVE, GET_LEAVE, POST } from "../actions/types";

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
               leave => leave.id !== action.payload
            )
         }

      case POST:
         console.log('action : ', action)
         return { ...state, leaves: [...state.leaves.filter(item => item.id !== action.payload.id), action.payload] }

      default:
         return state
   }
}