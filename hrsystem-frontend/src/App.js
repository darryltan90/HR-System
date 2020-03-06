import React, { Component } from 'react';
//import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NewLeave from './pages/Leave/employee/NewLeave';
import EmployeeLeaveDashboard from './pages/Leave/employee/EmployeeLeaveDashboard';
import { Provider } from "react-redux";
import store from './store'
import UpdateLeave from './pages/Leave/employee/UpdateLeave';
import Login from './pages/login/Login';
import AdminLeaveDashboard from './pages/Leave/admin/AdminLeaveDashboard';
import AdminEmployeeDashboard from './pages/Leave/admin/AdminEmployeesDashboard';
import CalendarDashboard from './pages/CalendarDashboard';
import NewEmployee from './pages/Leave/admin/NewEmployee';

class App extends Component {

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

                  {/* employee pages */}
                  {/* <Route exact path='/employee/leave/' component={authenticator.isLoggedIn ? EmployeeLeaveDashboard : this.redirectToLogin} /> */}
                  <Route exact path='/employee/leave/' component={EmployeeLeaveDashboard} />
                  <Route exact path='/employee/leave/newLeave' component={NewLeave} />
                  <Route exact path='/employee/leave/updateLeave/:leave_id' component={UpdateLeave} />

                  {/* admin pages */}
                  <Route exact path='/admin/leave/' component={AdminLeaveDashboard} />
                  <Route exact path='/admin/employee/' component={AdminEmployeeDashboard} />
                  <Route exact path='/admin/employee/newEmployee' component={NewEmployee} />

               </div>
            </Router>
         </Provider>
      )
   }
}

export default App;
