import React, { Component } from 'react'
import { getLeaveByStatus } from '../actions/employeeLeavesActions'

import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import { connect } from 'react-redux'
import { Button, Row } from 'antd'
import { Icon } from '@ant-design/compatible'


// ???????
// If you use the default popups, use this.
// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';

class CalendarTUI extends Component {
	calendarRef = React.createRef()

	constructor() {
		super()
		this.state = {
			stateDate: ''
		}
	}

	componentDidMount() {
		this.props.getLeaveByStatus('APPROVED')
		this.getDate('today')
	}

	// navigating the calendar
	navigateCal = action => {
		const calendarInstance = this.calendarRef.current.getInstance()
		switch (action) {
			case 'next':
				calendarInstance.next()
				this.getDate('next')
				return

			case 'prev':
				calendarInstance.prev()
				this.getDate('prev')
				return

			case 'today':
				calendarInstance.today()
				this.getDate('today')
				return

			// does not work for monthView
			// case 'test':
			// 	calendarInstance.setDate('2019-1')
			// 	return

			default:
				break
		}

		console.log('test return here:::::')
	}

	// to show the month and year
	getDate = when => {
		var tempDate = new Date()
		var splitDate = []
		var splitMonth = 0
		var splitYear = 0

		console.log('when:::', when)

		switch (when) {
			case 'today':
				var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1)
				this.setState({ stateDate: date })
				break

			case 'next':
				//splits the current date into [year, month]
				splitDate = this.state.stateDate.split('-')
				splitYear = parseInt(splitDate[0], 10)
				splitMonth = parseInt(splitDate[1], 10) + 1

				if (splitMonth === 13) {
					splitMonth = 1
					splitYear++
				}

				this.setState({ stateDate: splitYear + '-' + splitMonth })
				break

			case 'prev':
				//splits the current date into [year, month]
				splitDate = this.state.stateDate.split('-')
				splitYear = parseInt(splitDate[0], 10)
				splitMonth = parseInt(splitDate[1], 10) - 1

				if (splitMonth === 0) {
					splitMonth = 12
					splitYear--
				}

				this.setState({ stateDate: splitYear + '-' + splitMonth })
				break

			default:
				console.log('**getDate error**')
				break
		}
	}

	render() {
		console.log('this.props.calendarLeaves:::', this.props.calendarLeaves)

		// calendar settings from TUI
		const calendarOptions = {
			usageStatistics: false, //if enabled, will send hostname
			view: 'month',
			height: '800px',
			isReadOnly: true
		}

		// to convert each leave into a schedule for TUI Calendar compatibility
		const calSchedule = this.props.calendarLeaves.map(leave => ({
			id: leave.id,
			title: leave.leaveType + ': ' + leave.employee.empName,
			start: leave.startDate,
			end: leave.endDate,
			bgColor:
				leave.leaveType === 'Medical'
					? 'lightgreen'
					: leave.leaveType === 'Annual'
						? 'yellow'
						: 'grey',
			category: 'allday'
			// modify here for halfday leave
		}))

		return (
			<div>

				<Row align='middle'>
					<Button
						size="large"
						shape="circle"
						onClick={() => this.navigateCal('prev')}
					>
						<Icon type="left" />
					</Button>

					<Button
						size="large"
						shape="circle"
						onClick={() => this.navigateCal('next')}
					>
						<Icon type="right" />
					</Button>

					<Button
						size="large"
						shape="round"
						onClick={() => this.navigateCal('today')}
					>
						Current month
					</Button>
					<font size="+4">{this.state.stateDate}</font>
				</Row>

				{/* <button onClick={() => this.navigateCal('test')}>Test</button> */}
				{/* dropdown menu to select month/year */}
				<Calendar
					ref={this.calendarRef}
					{...calendarOptions} //calendar settings from TUI
					schedules={calSchedule} //displaying leaves
				// template={{
				// 	milestone(schedule) {
				// 		return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
				// 			schedule.title
				// 			}</span>`
				// 	},
				// 	makes the days capital letters
				// 	monthDayname(model) {
				// 		console.log('monthDayName model:::', model)
				// 		return (model.label).toString().toLocaleUpperCase();
				// 	}
				// }}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	calendarLeaves: state.reduxLeave.calendarLeaves
})

export default connect(mapStateToProps, { getLeaveByStatus })(CalendarTUI)
