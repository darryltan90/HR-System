import { GET_ADMIN_DETAILS, GET_EMP_DETAILS, USER_LOGOUT } from "../actions/types";

const initialState = {
	employee: {}
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
			console.log('GET_EMP_DETAILS action :: ', action)
			return {
				...state,
				employee: action.payload
			}

		case USER_LOGOUT:
			console.log('USER_LOGOUT action:: ', action)
			return {
				employee: {}
			}
		default:
			return state
	}
}