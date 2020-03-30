import React, { Component } from 'react'
import { Layout, Col, Form, Input, Select, Row, Button } from 'antd';
import MenuHeader from '../../../components/MenuHeader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addEmp } from '../../../actions/adminEmployeeActions';
import { Link } from 'react-router-dom';

class UpdateEmployee extends Component {

	componentDidMount() {
		console.log('this.props.employeeDetails', this.props.employeeDetails)
	}


	// when submit button is clicked
	onSubmit = e => {
		e.preventDefault()

		this.props.form.validateFields((err, fieldsValue) => {
			if (err || fieldsValue['empType'] === undefined) {
				return (console.log('error/emptype null:::', fieldsValue['empType']))
			}

			const updateEmp = {
				empId: this.props.employeeDetails.empId,
				empName: fieldsValue['empName'],
				email: fieldsValue['email'],
				password: fieldsValue['password'],
				empType: fieldsValue['empType']
			}

			console.log('UpdateEmployee received form values:: ', updateEmp)

			this.props.addEmp(updateEmp, this.props.history)
		})
	}

	render() {

		//for layout
		const { Header, Content, Footer } = Layout;

		const { getFieldDecorator } = this.props.form;

		const { empName, email, password, empType } = this.props.employeeDetails

		const nameFieldDecorator = [{
			rules: [{ required: true, message: "Please enter a name!" }],
			initialValue: empName
		}]

		const empTypeFieldDecorator = [{
			rules: [{ required: true, message: "Please select an employee type!" }],
			initialValue: empType
		}]

		const emailFieldDecorator = [{
			rules: [{ required: true, message: "Please enter an email!" }],
			initialValue: email
		}]

		const passwordFieldDecorator = [{
			rules: [{ required: true, message: "Please enter a password!" }],
			initialValue: password
		}]

		return (
			<Layout>
				<Header>
					<MenuHeader selectedKey='employees' />
				</Header>
				<Content>
					<Col style={{ margin: '94px 24px 24px 24px' }} span={5} push={9} >
						<h1>Update Employee</h1>
						<Form onSubmit={this.onSubmit}>

							{/* employee name */}
							<Form.Item>
								{getFieldDecorator('empName', ...nameFieldDecorator)
									(<Input placeholder='Employee name' />)
								}
							</Form.Item>

							{/* email */}
							<Form.Item>
								{getFieldDecorator('email', ...emailFieldDecorator)
									(<Input placeholder='Email' />)
								}
							</Form.Item>

							{/* password */}
							<Form.Item>
								{getFieldDecorator('password', ...passwordFieldDecorator)
									(<Input placeholder='Password' />)
								}
							</Form.Item>

							{/* employee type */}
							<Form.Item>
								{getFieldDecorator("empType", { ...empTypeFieldDecorator })(
									<Select
										placeholder="Employee type"
									>
										<Select.Option value="admin">Admin</Select.Option>
										<Select.Option value="employee">Employee</Select.Option>
									</Select>
								)}
							</Form.Item>

							{/* -----------buttons----------- */}
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

export default compose(connect(mapStateToProps, { addEmp }), Form.create())(UpdateEmployee)