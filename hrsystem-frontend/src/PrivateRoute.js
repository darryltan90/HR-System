
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth, ...rest }) {

	console.log('privateroute auth::', auth)

	return (
		<Route
			{...rest}
			render={(props) =>
				auth.empId !== undefined ? (
					<Component {...props} />
				) : (
						<Redirect to="/" />
					)
			}
		/>
	)
}

const mapStateToProps = state => ({
	auth: state.auth.employee
})

export default connect(mapStateToProps)(PrivateRoute)