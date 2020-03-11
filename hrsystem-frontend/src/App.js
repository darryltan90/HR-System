import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

// PAGES
import NewLeave from './pages/Leave/employee/NewLeave';
import EmployeeLeaveDashboard from './pages/Leave/employee/EmployeeLeaveDashboard';
import UpdateLeave from './pages/Leave/employee/UpdateLeave';
import Login from './pages/login/Login';
import AdminLeaveDashboard from './pages/Leave/admin/AdminLeaveDashboard';
import AdminEmployeeDashboard from './pages/Leave/admin/AdminEmployeesDashboard';
import CalendarDashboard from './pages/CalendarDashboard';
import NewEmployee from './pages/Leave/admin/NewEmployee';
import UpdateEmployee from './pages/Leave/admin/UpdateEmployee';
import PrivateRoute from './PrivateRoute';

class App extends Component {

	//not used yet
	redirectToLogin = () => {
		return (
			<Redirect to='/' />
		)
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						{/* Log in page */}
						<Route exact path='/' component={Login} />

						{/* public pages */}
						<Route exact path='/calendar/' component={CalendarDashboard} />

						{/* ----------------EMPLOYEE PAGES---------------- */}
						{/* leaves */}
						<PrivateRoute exact path='/employee/leave/' component={EmployeeLeaveDashboard} />
						<PrivateRoute exact path='/employee/leave/newLeave' component={NewLeave} />
						<PrivateRoute exact path='/employee/leave/updateLeave/' component={UpdateLeave} />

						{/* ----------------ADMIN PAGES---------------- */}
						{/* leaves */}
						<PrivateRoute exact path='/admin/leave/' component={AdminLeaveDashboard} />
						{/* employees */}
						<PrivateRoute exact path='/admin/employees/' component={AdminEmployeeDashboard} />
						<PrivateRoute exact path='/admin/employees/newEmployee' component={NewEmployee} />
						<PrivateRoute exact path='/admin/employees/updateEmployee' component={UpdateEmployee} />

					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
