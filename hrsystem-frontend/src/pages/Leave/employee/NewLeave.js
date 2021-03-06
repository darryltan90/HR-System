import React, { Component } from 'react'
import { Layout, Row, DatePicker, Col, Button, Form, Select } from 'antd';
import moment from 'moment'
import MenuHeader from '../../../components/MenuHeader';
import TextArea from 'antd/lib/input/TextArea';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLeave } from "../../../actions/employeeLeavesActions";


class NewLeave extends Component {

	//when submit is clicked
	onFinish = values => {

		const rangeValue = values["range-picker"]

		const newLeave = {
			"employee": this.props.auth,
			"leaveType": values['leave-type'],
			"startDate": rangeValue[0].format("YYYY-MM-DD"),
			"endDate": rangeValue[1].format("YYYY-MM-DD"),
			"reason": values['reason'],
			"status": 'PENDING' //do not change, initial value will always be 'PENDING'
		}

		console.log('newLeave:::::', newLeave)

		this.props.addLeave(newLeave, this.props.history)
	}

	// Cannot select days before today and today
	disabledDate = (current) => {
		return current && current < moment().endOf('day');
	}

	render() {

		console.log("NewLeave this.props.auth:: ", this.props.auth)

		//for layout
		const { Header, Content, Footer } = Layout;

		//const dateFormat = 'YYYY-MM-DD';

		return (
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					{/* pass props to choose default selected tab */}
					<MenuHeader selectedKey='leave' />
				</Header>
				<Content>
					<Col style={{ margin: '94px 24px 24px 24px' }} span={5} push={9} >
						<h1>Leave Request</h1>
						<Form onFinish={this.onFinish}>
							{/* select menu */}
							<Form.Item
								name='leave-type'
								rules={[{ required: true, message: "Please select leave type!" }]}
							>
								<Select placeholder="Leave type" >
									<Select.Option value="Annual">Annual</Select.Option>
									<Select.Option value="Medical">Medical</Select.Option>
									<Select.Option value="Unpaid">Unpaid</Select.Option>
								</Select>
							</Form.Item>

							{/* date range picker */}
							<div style={{ margin: '24px' }} />
							<Form.Item
								name='range-picker'
								rules={[{ type: "array", required: true, message: "Please select date!" }]}
							>
								<DatePicker.RangePicker disabledDate={this.disabledDate} />
							</Form.Item>

							{/* textarea */}
							<div style={{ margin: '24px' }} />
							<Form.Item
								name='reason'
							>
								<TextArea
									placeholder="Reason for leave"
									allowClear //gives the X button on top right
									autoSize={{ minRows: 6, maxRows: 6, }} //fixes row at 6
								/>
							</Form.Item>

							{/* buttons */}
							<Row type="flex" justify="space-around">
								<Form.Item>
									<Button type="danger" >
										<Link to="/employee/leave/">
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
						<div style={{ margin: '24px' }} />
					</Col>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					HR System
				</Footer>
			</Layout>
		)
	}
}

NewLeave.propTypes = {
	addLeave: PropTypes.func.isRequired
}

//global state(redux), apply to local props
const mapStateToProps = state => ({
	auth: state.auth.employee,
})

export default connect(mapStateToProps, { addLeave })(NewLeave)