
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';


class DatePickerRange extends Component {

   constructor() {
      super()
      //state here
   }

   onChange = (date, dateString) => {
      console.log(JSON.stringify(date), JSON.stringify(dateString));
      //date = ["2020-01-28T06:10:37.353Z","2020-02-12T06:10:37.353Z"]
      //dateString = ["2020-01-28","2020-02-12"]
   }

   render() {
      const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

      return (
         <div>
            {/* <DatePicker onChange={this.onChange} /> */}
            {/* <MonthPicker onChange={this.onChange} placeholder="Select month" /> */}
            {/* <WeekPicker onChange={this.onChange} placeholder="Select week" /> */}
            <RangePicker onChange={this.onChange} />
         </div>
      )
   }
}

export default DatePickerRange