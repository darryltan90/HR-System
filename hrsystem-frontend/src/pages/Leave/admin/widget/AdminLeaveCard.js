import React, { Component } from 'react'
import { Card, Icon, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { updateLeaveStatus } from "../../../../actions/adminLeavesActions";

class LeaveCard extends Component {

   onRejectClick = () => {
      const updateLeaveStatus = {
         "id": this.props.leave.id,
         "leaveType": this.props.leave.leaveType,
         "startDate": this.props.leave.startDate,
         "endDate": this.props.leave.endDate,
         "reason": this.props.leave.reason,
         "status": 'REJECTED'
      }

      this.props.updateLeaveStatus(updateLeaveStatus, null)

   }

   onApproveClick = () => {
      //console.log(this.props)
      //return
      const updateLeaveStatus = {
         "id": this.props.leave.id,
         "leaveType": this.props.leave.leaveType,
         "startDate": this.props.leave.startDate,
         "endDate": this.props.leave.endDate,
         "reason": this.props.leave.reason,
         "status": 'APPROVED'
      }

      this.props.updateLeaveStatus(updateLeaveStatus)

   }

   render() {
      //leave defracturing
      const { id, leaveType, startDate, endDate, reason, status } = this.props.leave

      console.log(JSON.stringify(status))



      if (status === 'APPROVED' || status === 'REJECTED') {
         //const deleteButton = <Icon type="delete" onClick={this.onDeleteClick.bind(this, id)} />
         return (
            <Card
               style={{ width: 435, marginTop: 16 }}
            >
               <Meta
                  title={`${leaveType} - (employee name here)`}
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
               <Popconfirm
                  title={`Reject ${leaveType} leave requested by (employee name here)?`}
                  onConfirm={this.onRejectClick}
                  okText='Yes'
                  cancelText='No'
               >
                  <Icon type="close-circle" style={{ color: 'red' }} />
               </Popconfirm>
               ,
               <Popconfirm
                  title={`Approve ${leaveType} leave requested by (employee name here)?`}
                  onConfirm={this.onApproveClick}
                  okText='Yes'
                  cancelText='No'
               >
                  <Icon type="check-circle" style={{ color: 'green' }} />
               </Popconfirm>
            ]}
         >
            <Meta
               title={`${leaveType} - (employee name here)`}
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
   updateLeaveStatus: PropTypes.func.isRequired
}

export default connect(null, { updateLeaveStatus })(LeaveCard)