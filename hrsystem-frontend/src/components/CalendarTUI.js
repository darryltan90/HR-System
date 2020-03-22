import React, { Component } from 'react'
import { getLeaveByStatus } from '../actions/employeeLeavesActions'

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { connect } from 'react-redux';

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

			default: break
		}

		console.log('test return here:::::')

	}

	// to show the month and year
	getDate = (when) => {

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
				splitMonth = (parseInt(splitDate[1], 10) + 1)
				
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
				splitMonth = (parseInt(splitDate[1], 10) - 1)

				if (splitMonth === 0) {
					splitMonth = 12
					splitYear--
				}
				
				this.setState({ stateDate: splitYear+ '-' + splitMonth})
				break

			default:
				console.log('**getDate error**')
				break
		}

	}

	render() {

		console.log("this.props.calendarLeaves:::", this.props.calendarLeaves)


		const calendarOptions = {
			usageStatistics: false,
			view: 'month',
			height: '800px',
			isReadOnly: true,

		}

		const testCalSchedule = this.props.calendarLeaves.map(leave => (
			{
				id: leave.id,
				title: leave.leaveType + ": " + leave.employee.empName,
				start: leave.startDate,
				end: leave.endDate,
				bgColor: leave.leaveType === 'Medical' ?
					'lightgreen' :
					leave.leaveType === 'Annual' ?
						'yellow' :
						'grey',
				category: 'allday',
				// modify here for halfday leave
			}
		))

		return (
			<div>
				<h1>{this.state.stateDate}</h1>
				<button onClick={() => this.navigateCal('prev')}>Previous month</button>
				<button onClick={() => this.navigateCal('next')}>Next month</button>
				<button onClick={() => this.navigateCal('today')}>Current month</button>
				{/* dropdown menu to select month/year */}
				<Calendar
					ref={this.calendarRef}
					{...calendarOptions}
					schedules={testCalSchedule}
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