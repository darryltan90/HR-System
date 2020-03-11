import { POST_EMP, GET_ALL_EMP, GET_EMP, DELETE_EMP } from "../actions/types";

const initialState = {
	allEmployees: [],
	employeeDetails: {}
}

export default function (state = initialState, action) {
	switch (action.type) {
		case POST_EMP:
			return {
				...state,
				allEmployees: [
					...state.allEmployees.filter(
						item => item.empId !== action.payload.empId
					),
					action.payload
				]
			}

		case GET_ALL_EMP:
			return {
				...state,
				allEmployees: action.payload
			}

		case GET_EMP:
			return {
				...state,
				employeeDetails: action.payload
			}

		//no yet implemented in backend
		case DELETE_EMP:
			return {
				...state,
				allEmployees: state.allEmployees.filter(
					item => item.empId !== action.payload
				)
			}

		default:
			return state
	}
}