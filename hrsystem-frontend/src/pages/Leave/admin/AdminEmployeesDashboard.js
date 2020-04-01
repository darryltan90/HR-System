import React, { Component } from 'react'
import { Layout, Table, Col, Row, Button, Tag, Modal } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getAllEmp, getEmp, deleteEmp } from '../../../actions/adminEmployeeActions'
import { connect } from 'react-redux'
import { Icon } from '@ant-design/compatible'


class AdminEmployeeDashboard extends Component {
	componentDidMount() {
		this.props.getAllEmp()
	}

	onEditClick = employeeDetails => {
		//dispatches the employee details to redux
		this.props.getEmp(employeeDetails)
	}

	onDeleteClick = employeeDetails => {
		console.log('delete modal click::', employeeDetails)

		// idk why it does not work when being called directly
		const deleteEmp2 = this.props.deleteEmp

		Modal.confirm({
			title: 'Are you sure you want to delete this employee?',
			icon:
				<Icon
					type='exclamation-circle'
					style={{ fontSize: 'large' }}
				/>,
			content:
				<b>
					ID: {employeeDetails.empId}<br />
               Name: {employeeDetails.empName}<br />
               Email: {employeeDetails.email}<br />
               Type: {employeeDetails.empType}<br />
				</b>,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				console.log('delete modal ok click:::', employeeDetails.empId)
				deleteEmp2(employeeDetails.empId)
			}
		})
	}

	render() {
		const { Header, Content, Footer } = Layout

		console.log('AdminEmployeeDashboard this.props.allEmployees::: ', this.props.allEmployees)

		// title, dataIndex, key, action
		const columnDetails = [
			{ title: 'ID', dataIndex: 'empId', key: 'empId', width: 60, align: 'center' },
			{ title: 'Name', dataIndex: 'empName', key: 'empName' },
			{ title: 'Email', dataIndex: 'email', key: 'email', width: 400 },
			{
				title: 'Type',
				dataIndex: 'empType',
				key: 'empType',
				width: 150,
				render: empType => {
					let color = empType === 'admin' ? 'green' : 'blue';
					return (
						<Tag color={color} key={empType}>
							{empType.toUpperCase()}
						</Tag>
					);
				}
			},
			{
				//employee will be used to link delete and edit
				title: 'Actions', key: 'actions', render: (employeeDetails) =>
					<Row justify='space-around'>
						<Col span={1}>

							<Icon
								type="delete"
								theme="twoTone"
								twoToneColor="red"
								style={{ fontSize: 'large' }}
								onClick={() => this.onDeleteClick(employeeDetails)}
							/>

						</Col>
						<Col span={1} push={2}>
							<Link to='/admin/employees/updateEmployee'>
								<Icon
									type="edit"
									theme="twoTone"
									style={{ fontSize: 'large' }}
									//inline function needed to pass values
									onClick={() => this.onEditClick(employeeDetails)}
								/>
							</Link>
						</Col>
					</Row>

			}
		]

		const empArr = [
			...this.props.reduxEmployee.allEmployees
		]

		return (
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<MenuHeader selectedKey="employees" />
				</Header>
				<Content>
					<Col span={20} style={{ margin: '94px 0px 24px 120px' }}>
						<Button type='primary' style={{ marginBottom: '24px' }} >
							<Link to='/admin/employees/newEmployee' >
								New employee
                     </Link>
						</Button>
						<Table
							dataSource={empArr}
							columns={columnDetails}
							rowKey={row => row.empId}
							bordered
						/>
					</Col>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					HR System
				</Footer>
			</Layout>
		)
	}
}

const mapStateToProps = state => ({
	reduxEmployee: state.reduxEmployee
})

export default connect(mapStateToProps, { getAllEmp, getEmp, deleteEmp })(AdminEmployeeDashboard)