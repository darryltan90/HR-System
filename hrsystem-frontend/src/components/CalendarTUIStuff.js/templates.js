import moment from 'moment'


export const templates = {

	popupIsAllDay: () => 'All Day',

	popupStateFree: () => 'Free',

	popupStateBusy: () => 'Busy',

	titlePlaceholder: () => 'Subject',

	locationPlaceholder: () => 'Location',

	startDatePlaceholder: () => 'Start date',

	endDatePlaceholder: () => 'End date',

	popupSave: () => 'Save',

	popupUpdate: () => 'Update',

	popupDetailDate: (isAllDay, start, end) => {
		var isSameDate = moment(start).isSame(end);
		var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a'

		if (isAllDay) {
			return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'))
		}

		return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat))
	},

	popupDetailLocation: schedule => 'Location : ' + schedule.location,

	popupDetailUser: (schedule) => 'User : ' + (schedule.attendees || []).join(', '),

	popupDetailState: (schedule) => 'State : ' + schedule.state || 'Busy',

	popupDetailRepeat: (schedule) => 'Repeat : ' + schedule.recurrenceRule,

	popupDetailBody: (schedule) => 'Body : ' + schedule.body,

	popupEdit: () => 'Edit',

	popupDelete: () => 'Delete',

	monthDayname: (dayname) => (
		'<span class="calendar-week-dayname-name">' + dayname.label + '</span>'
	)

};