import React, { Component } from 'react'
import { Layout, Col, Form, Input, Select, Row, Button } from 'antd';
import MenuHeader from '../../../components/MenuHeader';
import { connect } from 'react-redux';
import { addEmp } from '../../../actions/adminEmployeeActions';
import { Link } from 'react-router-dom';

class UpdateEmployee extends Component {

	componentDidMount() {
		console.log('this.props.employeeDetails', this.props.employeeDetails)
	}


	// when submit button is clicked
	onFinish = values => {
		console.log('all received values', values)

		const updateEmp = {
			...values,
			empId: this.props.employeeDetails.empId
		}

		this.props.addEmp(updateEmp, this.props.history)
	}

	render() {

		//for layout
		const { Header, Content, Footer } = Layout;

		const { empName, email, password, empType } = this.props.employeeDetails

		return (
			<Layout>
				<Header>
					<MenuHeader selectedKey='employees' />
				</Header>
				<Content>
					<Col style={{ margin: '94px 24px 24px 24px' }} span={5} push={9} >
						<h1>Update Employee</h1>
						<Form
							onFinish={this.onFinish}
							initialValues={{
								empName: empName,
								email: email,
								password: password,
								empType: empType
							}}
						>

							{/* employee name */}
							<Form.Item
								name='empName'
								rules={[{ required: true, message: "Please enter a name!" }]}
							>
								<Input placeholder='Employee name' />
							</Form.Item>

							{/* email */}
							<Form.Item
								name='email'
								rules={[{ required: true, message: 'Please enter an email!' }]}
							>
								<Input placeholder='Email' />
							</Form.Item>

							{/* password */}
							<Form.Item
								name='password'
								rules={[{ required: true, message: 'Please enter a password!' }]}
							>
								<Input placeholder='Password' />
							</Form.Item>

							{/* employee type */}
							<Form.Item
								name='empType'
								rules={[{ required: true, message: 'Please select an employee type!' }]}
							>
								<Select
									placeholder="Employee type"
								>
									<Select.Option value="admin">Admin</Select.Option>
									<Select.Option value="employee">Employee</Select.Option>
								</Select>
							</Form.Item>

							{/* buttons */}
							<Row type="flex" justify="space-around">
								<Form.Item>
									<Button type="danger" >
										<Link to="/admin/employees/">
											Cancel
                              </Link>
									</Button>
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit">
										Submit
                           </Button>
								</Form.Item>
							</Row>

						</Form>
					</Col>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					HR System
				</Footer>
			</Layout>
		)
	}
}

UpdateEmployee.propTypes = {
	//getEmp
}

const mapStateToProps = state => ({
	auth: state.auth.employee,
	employeeDetails: state.reduxEmployee.employeeDetails
})

export default connect(mapStateToProps, { addEmp })(UpdateEmployee)