import React, { Component } from 'react'
import { Card, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { updateLeaveStatus } from "../../../../actions/adminLeavesActions";
import { Icon } from '@ant-design/compatible'

class LeaveCard extends Component {
	//color = {}

	onRejectClick = () => {
		const updateLeaveStatus = {
			// "id", "empId", "leaveType", "startDate", "endDate", "reason", "status"
			...this.props.leaveDetails,
			"status": 'REJECTED'
		}
		console.log("updateLeaveStatus data(check for empId):: ", updateLeaveStatus)
		this.props.updateLeaveStatus(updateLeaveStatus, null)
	}

	onApproveClick = () => {
		const updateLeaveStatus = {
			// "id", "empId", "leaveType", "startDate", "endDate", "reason", "status"
			...this.props.leaveDetails,
			"status": 'APPROVED'
		}
		console.log("updateLeaveStatus(check for empId):: ", updateLeaveStatus)
		this.props.updateLeaveStatus(updateLeaveStatus)
	}

	render() {
		//leave defracturing
		const { /*id,*/ leaveType, startDate, endDate, reason, status, employee } = this.props.leaveDetails

		console.log("AdminLeaveCard status:: ", JSON.stringify(this.props.leaveDetails))

		if (status === 'APPROVED' || status === 'REJECTED') {
			//const deleteButton = <Icon type="delete" onClick={this.onDeleteClick.bind(this, id)} />
			//const a = null
			switch (status === 'APPROVED') {
				case 'APPROVED':
					this.color = { backgroundColor: '#8fd460' }
					break;
				case 'REJECTED':
					this.color = { backgroundColor: '#8fd460' }
					break;
				default:
					this.color = {}
			}
			return (
				<Card
					style={{ width: 435, marginTop: 16, /*...this.color*/ }}
				>
					<Meta
						title={`${leaveType} - ${employee.empName}`}
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
				style={{ width: 435, marginTop: 16, /*backgroundColor: '#f8f48b'*/ }}
				actions={[
					<Popconfirm
						title={`Reject ${leaveType} leave requested by ${employee.empName}?`}
						onConfirm={this.onRejectClick}
						okText='Yes'
						cancelText='No'
					>
						<Icon type="close-circle" style={{ color: 'red' }} />
					</Popconfirm>
					,
					<Popconfirm
						title={`Approve ${leaveType} leave requested by ${employee.empName}?`}
						onConfirm={this.onApproveClick}
						okText='Yes'
						cancelText='No'
					>
						<Icon type="check-circle" style={{ color: 'green' }} />
					</Popconfirm>
				]}
			>
				<Meta
					title={`${leaveType} - ${employee.empName}`}
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