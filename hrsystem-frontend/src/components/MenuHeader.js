import React, { Component } from 'react'
import { Menu, Row, Col, Popconfirm } from 'antd'
import logo from './../images/workspez_logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetReduxStore } from '../actions/authenticatorActions'
import { compose } from 'redux'
import { Icon } from '@ant-design/compatible'


class MenuHeader extends Component {
	//resets {auth} in redux
	resetLoginDetail = e => {
		e.preventDefault()
		this.props.resetReduxStore()
	}

	// to be modified in future to reduce boilerplate code
	DynamicMenuItem = (newKey, text, linkTo) => {
		return (
			<Menu.Item key={newKey}>
				<Link to={linkTo}>{text}</Link>
			</Menu.Item>
		)
	}

	render() {
		return (
			//total 24 cols, 3(logo)+18(menu)+2(username)+1(logout icon)
			<Row type="flex">
				<Col span={3}>
					<img src={logo} alt="workspez logo" width="150" height="50" />
				</Col>
				<Col span={18}>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={[this.props.selectedKey]}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="calendar">
							<Link to="/calendar">Calendar</Link>
						</Menu.Item>
						<Menu.Item key="leave">
							<Link to="/employee/leave/">Leave</Link>
						</Menu.Item>
						{this.props.auth.empType === 'admin' ? (
							<Menu.Item key="adminLeave">
								<Link to="/admin/leave/">Admin leave</Link>
							</Menu.Item>
						) : null}
						{this.props.auth.empType === 'admin' ? (
							<Menu.Item key="employees">
								<Link to="/admin/employees/">Employees</Link>
							</Menu.Item>
						) : null}
					</Menu>
				</Col>
				<Col span={2}>
					<font color="white">
						<b>Hi, {this.props.auth.empName}</b>
					</font>
				</Col>
				<Col span={1}>
					<Popconfirm
						title={'Are you sure you want to log out?'}
						placement="bottomRight"
						okText={<Link to="/">Yes</Link>}
						cancelText="No"
						onConfirm={this.resetLoginDetail}
					>
						<Icon
							type="logout"
							style={{ margin: '18px', color: 'red', fontSize: '28px' }}
						/>
					</Popconfirm>
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth.employee
})

export default compose(connect(mapStateToProps, { resetReduxStore }))(
	MenuHeader
)
