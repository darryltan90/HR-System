import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewLeave from './pages/Leave/NewLeave';
import LeaveDashboard from './pages/Leave/LeaveDashboard';
import { Provider } from "react-redux";
import store from './store'
import UpdateLeave from './pages/Leave/UpdateLeave';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div>
                  <Route exact path='/' component={LeaveDashboard} />
                  <Route exact path='/newLeave' component={NewLeave} />
                  <Route exact path='/updateLeave/:leave_id' component={UpdateLeave} />
               </div>
            </Router>
         </Provider>
      )
   }
}

export default App;
