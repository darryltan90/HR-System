import { GET_LEAVES, DELETE_LEAVE, GET_LEAVE, POST_LEAVE, USER_LOGOUT, GET_LEAVES_BY_STATUS, } from "../actions/types";

const initialState = {
	allLeaves: [],
	leaveDetails: {},
	calendarLeaves: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_LEAVES:
			return {
				...state,
				allLeaves: action.payload
			}

		case GET_LEAVE:
			return {
				...state,
				leaveDetails: action.payload
			}

		case DELETE_LEAVE:
			return {
				...state,
				allLeaves: state.allLeaves.filter(
					item => item.id !== action.payload
				)
			}

		case POST_LEAVE:
			console.log('POST_LEAVE action:: ', action)
			return {
				...state,
				allLeaves: [
					...state.allLeaves.filter(
						item => item.id !== action.payload.id
					),
					action.payload
				]
			}

		case GET_LEAVES_BY_STATUS:
			return {
				...state,
				calendarLeaves: action.payload
			}

		case USER_LOGOUT:
			return { ...initialState }

		default:
			return state
	}
}