import React, { Component } from 'react'
import { Card, Icon, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { deleteLeave, getLeave } from "../../../../actions/employeeLeavesActions";

class LeaveCard extends Component {

	onDeleteClick = (leaveId, empId) => {
		console.log("leaveId:: ", leaveId)
		console.log("empId:: ", empId)
		this.props.deleteLeave(leaveId, empId, "employee")
	}

	onEditClick = leaveDetails => {
		this.props.getLeave(leaveDetails)
	}

	render() {
		//leave defracturing
		const { leaveDetails } = this.props
		console.log("LeaveCard status::: ", JSON.stringify(leaveDetails.status))
		console.log("LeaveCard empId::: ", leaveDetails.employee.empId)

		if (leaveDetails.status === 'APPROVED' || leaveDetails.status === 'REJECTED') {
			return (
				<Card style={{ width: 435, marginTop: 16 }}>
					<Meta
						title={leaveDetails.leaveType}
						description={`${leaveDetails.startDate} - ${leaveDetails.endDate}`}
					/>
					<p>{leaveDetails.reason}</p>
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
						// either 1 works
						// onConfirm={() => this.onDeleteClick(leaveDetails.id, leaveDetails.employee.empId)}
						onConfirm={this.onDeleteClick.bind(this, leaveDetails.id, leaveDetails.employee.empId)}
					>
						<Icon
							type="delete"
							theme="twoTone"
							twoToneColor="red"
							style={{ fontSize: 'large' }}
						/>
					</Popconfirm>
					,
					<Link to={`/employee/leave/updateLeave`}>
						<Icon
							type="edit"
							theme="twoTone"
							style={{ fontSize: 'large' }}
							onClick={() => this.onEditClick(leaveDetails)}
						/>
					</Link>
				]}
			>
				<Meta
					title={leaveDetails.leaveType}
					description={`${leaveDetails.startDate} - ${leaveDetails.endDate}`}
				/>
				<p>
					{leaveDetails.reason}
				</p>
			</Card>
		)
	}
}

LeaveCard.propTypes = {
	deleteLeave: PropTypes.func.isRequired,
	getLeave: PropTypes.func.isRequired
}

export default connect(null, { deleteLeave, getLeave })(LeaveCard)