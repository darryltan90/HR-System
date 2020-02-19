import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewLeave from './pages/Leave/employee/NewLeave';
import EmployeeLeaveDashboard from './pages/Leave/employee/EmployeeLeaveDashboard';
import { Provider } from "react-redux";
import store from './store'
import UpdateLeave from './pages/Leave/employee/UpdateLeave';
import Login from './pages/login/login';
import AdminLeaveDashboard from './pages/Leave/admin/AdminLeaveDashboard';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/employee/leave/' component={EmployeeLeaveDashboard} />
                  <Route exact path='/employee/leave/newLeave' component={NewLeave} />
                  <Route exact path='/employee/leave/updateLeave/:leave_id' component={UpdateLeave} />

                  <Route exact path='/admin/leave/' component={AdminLeaveDashboard} />
               </div>
            </Router>
         </Provider>
      )
   }
}

export default App;
