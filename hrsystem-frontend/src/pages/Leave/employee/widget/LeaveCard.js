import React, { Component } from 'react'
import { Card, Icon, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { deleteLeave } from "../../../../actions/employeeLeavesActions";

class LeaveCard extends Component {

   onDeleteClick = (leaveId, empId) => {
      console.log("leaveId:: ", leaveId)
      console.log("empId:: ", empId)
      this.props.deleteLeave(leaveId, empId, "employee")
   }

   render() {
      //leave defracturing
      const { id, leaveType, startDate, endDate, reason, status, employee } = this.props.leave
      console.log("LeaveCard status::: ", JSON.stringify(status))
      console.log("LeaveCard empId::: ", employee.empId)

      if (status === 'APPROVED' || status === 'REJECTED') {
         return (
            <Card style={{ width: 435, marginTop: 16 }}>
               <Meta
                  title={leaveType}
                  description={`${startDate} - ${endDate}`}
               />
               <p>{reason}</p>
            </Card>
         )
      }

      return (
         <Card
            style={{ width: 435, marginTop: 16 }}
            actions={[
               <Popconfirm
                  title={"Are you sure you want to delete this leave?"}
                  placement="bottomLeft"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.onDeleteClick.bind(this, id, employee.empId)}
               >
                  <Icon
                     type="delete"
                     theme="twoTone"
                     twoToneColor="red"
                     //onClick={this.onDeleteClick}
                     // onClick={this.onDeleteClick.bind(this, id)}
                     //onClick={this.onDeleteClick.bind(this, id, employee.empId)}
                     style={{ fontSize: 'large' }}
                  />
               </Popconfirm>
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