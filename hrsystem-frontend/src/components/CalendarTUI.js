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

	componentDidMount() {
		this.props.getLeaveByStatus('APPROVED')
	}

	navigateCal = action => {
		const calendarInstance = this.calendarRef.current.getInstance()
		switch (action) {
			case 'next':
				calendarInstance.next()
				break

			case 'prev':
				calendarInstance.prev()
				break

			case 'today':
				calendarInstance.today()
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
				<button onClick={() => this.navigateCal('prev')}>Previous month</button>
				<button onClick={() => this.navigateCal('next')}>Next month</button>
				<button onClick={() => this.navigateCal('today')}>Current month</button>
				<Calendar
					ref={this.calendarRef}
					{...calendarOptions}
					schedules={testCalSchedule}
					template={{
						monthGridHeader(dayModel) {
							var date = parseInt(dayModel.date.split('-')[2], 10);
							var classNames = ['tui-full-calendar-weekday-grid-date '];

							if (dayModel.isToday) {
								classNames.push('tui-full-calendar-weekday-grid-date-decorator');
							}

							return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
						},
						milestone(schedule) {
							return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
								schedule.title
								}</span>`
						},
						// makes the days capital letters
						// monthDayname(model) {
						// 	console.log('monthDayName model:::', model)
						// 	return (model.label).toString().toLocaleUpperCase();
						// }
					}}

				/>
			</div>

		)
	}
}

const mapStateToProps = state => ({
	calendarLeaves: state.reduxLeave.calendarLeaves
})

export default connect(mapStateToProps, { getLeaveByStatus })(CalendarTUI)