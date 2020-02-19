import React, { Component } from 'react'
import { Card, Icon, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { deleteLeave } from "../../../../actions/leavesActions";

class LeaveCard extends Component {

   onDeleteClick(leave_id) {
      this.props.deleteLeave(leave_id)
   }

   test() { }

   actionMethod = () => {

   }

   render() {

      //leave defracturing
      const { id, leaveType, startDate, endDate, reason, status } = this.props.leave
      //const [buttonDisplay, setButtonDisplay] = useState('');
      console.log(JSON.stringify(status))



      if (status === 'APPROVED' || status === 'REJECTED') {
         //const deleteButton = <Icon type="delete" onClick={this.onDeleteClick.bind(this, id)} />
         return (
            <Card
               style={{ width: 435, marginTop: 16 }}
            >
               <Meta
                  title={leaveType}
                  description={`${startDate} - ${endDate}`}
               />
               <p>
                  {reason}
               </p>
            </Card>
         )
      }

      return (
         <Card
            style={{ width: 435, marginTop: 16 }}
            actions={[
               <Icon
                  type="delete"
                  theme="twoTone"
                  twoToneColor="red"
                  onClick={this.onDeleteClick.bind(this, id)}
                  style={{ fontSize: 'large' }}
               />
               ,
               <Link to={`/employee/leave/updateLeave/${id}`}>
                  <Icon
                     type="edit"
                     theme="twoTone"
                     style={{ fontSize: 'large' }}
                  />
               </Link>
            ]}
         >
            <Meta
               title={leaveType}
               description={`${startDate} - ${endDate}`}
            />
            <p>
               {reason}
            </p>
         </Card>
      )
   }
}

LeaveCard.propTypes = {
   deleteLeave: PropTypes.func.isRequired
}

export default connect(null, { deleteLeave })(LeaveCard)