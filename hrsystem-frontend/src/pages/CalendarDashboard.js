import React, { Component } from 'react'
import { Layout, Col } from 'antd'
// import Calendar from 'tui-calendar'
import MenuHeader from '../components/MenuHeader'
import CalendarTUI from '../components/CalendarTUI';
import Calendar from 'tui-calendar';



class CalendarDashboard extends Component {

	render() {

		const { Header, Content, Footer } = Layout

		return (
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<MenuHeader selectedKey='calendar' />
				</Header>
				<Content>
					{/* <Calendar /> */}
					<Col span={20} offset={2} style={{ marginTop: '100px', marginBottom: '50px' }}>
						<CalendarTUI calType="dashboard" />
					</Col>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					HR System
				</Footer>
			</Layout>
		)
	}
}




export default CalendarDashboard