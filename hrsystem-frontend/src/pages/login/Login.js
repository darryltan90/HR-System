import React, { Component } from 'react'
import { Layout, Col, Button, Row, Form, Input } from 'antd'
import logo from './../../images/workspez_logo.png'
import { getEmpDetails } from "../../actions/authenticatorActions";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';


class Login extends Component {

	// not in use at the moment
	onSubmit = e => {
		// prevents the page from refreshing
		e.preventDefault()

		this.props.form.validateFields((err, fieldsValue) => {
			if (err) {
				// if got error, dont do anything and exit function
				return;
			}

			//get employee leaves based on empId
			this.props.getEmpDetails(fieldsValue["username"], fieldsValue["password"], this.props.history)
		})

		//get employee leaves based on empId
		// this.props.getEmpDetails(fieldsValue["username"], fieldsValue["password"], this.props.history)
	}

	onFinish = values => {

		console.log('username::::', values['username'])
		console.log('password::::', values['password'])

		//get employee leaves based on empId
		this.props.getEmpDetails(values["username"], values["password"], this.props.history)
	}

	render() {

		const { /*Header,*/ Content, Footer } = Layout

		return (
			<Layout>
				<Content>
					<Col style={{ margin: '24px 24px 24px 24px' }} span={5} push={9} >
						<img src={logo} alt="workspez logo" width='300' height='100' style={{ margin: '0 0 24px' }} />
						<Row type="flex" justify="space-around">
							<Form onFinish={this.onFinish}>

								{/* username */}
								Username
								<Form.Item
									name='username'
									rules={[{ required: true, message: "Please enter username!" }]}
								>
									<Input placeholder="Username" />
								</Form.Item>

								{/* password */}
								Password
								<Form.Item
									name='password'
									rules={[{ required: true, message: "Please enter password!" }]}
								>
									<Input.Password placeholder="password" />
								</Form.Item>

								{/* Login button */}
								<Form.Item>
									<Row type="flex" justify="space-around">
										<Button type="primary" htmlType="submit">
											Login
										</Button>
									</Row>
								</Form.Item>

							</Form>
						</Row>
					</Col>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					HR System
				</Footer>
			</Layout>
		)

	}
}

Login.propType = {
	getEmpDetails: PropTypes.func.isRequired
}

export default connect(null, { getEmpDetails })(Login)
