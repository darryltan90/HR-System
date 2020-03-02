import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NewLeave from './pages/Leave/employee/NewLeave';
import EmployeeLeaveDashboard from './pages/Leave/employee/EmployeeLeaveDashboard';
import { Provider } from "react-redux";
import store from './store'
import UpdateLeave from './pages/Leave/employee/UpdateLeave';
import Login from './pages/login/login';
import AdminLeaveDashboard from './pages/Leave/admin/AdminLeaveDashboard';

class App extends Component {

   redirectToLogin = () => {
      return (
         <Redirect to='/' />
      )
   }

   render() {
      //this.props.authenticator.isLoggedIn
      //const authenticator.isLoggedIn = false

      // const authenticator = {
      //    isLoggedIn={
      //       admin = {
      //          id: 1,
      //          name: 'darryl admin'
      //       },
      //       employee = {
      //          id: 1,
      //          name: 'darryl'
      //       }
      //    }
      // }

      return (
         <Provider store={store}>
            <Router>
               <div>
                  {/* this.props.authenticator.isLoggedIn */}
                  {/* <Route exact path='/employee/leave/' component={authenticator.isLoggedIn ? EmployeeLeaveDashboard : this.redirectToLogin} /> */}

                  {/* Log in page */}
                  <Route exact path='/' component={Login} />

                  {/* employee pages */}
                  {/* <Route exact path='/employee/leave/' component={authenticator.isLoggedIn ? EmployeeLeaveDashboard : this.redirectToLogin} /> */}
                  <Route exact path='/employee/leave/' component={EmployeeLeaveDashboard} />
                  <Route exact path='/employee/leave/newLeave' component={NewLeave} />
                  <Route exact path='/employee/leave/updateLeave/:leave_id' component={UpdateLeave} />

                  {/* admin pages */}
                  <Route exact path='/admin/leave/' component={AdminLeaveDashboard} />
               </div>
            </Router>
         </Provider>
      )
   }
}

export default App;
