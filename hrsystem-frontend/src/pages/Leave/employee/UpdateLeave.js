import React, { Component } from 'react'
import { Layout, Row, DatePicker, Col, Button, Form, Select } from 'antd';
import moment from 'moment'
import MenuHeader from '../../../components/MenuHeader';
import TextArea from 'antd/lib/input/TextArea';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLeave, getLeave } from "../../../actions/leavesActions";
import { compose } from 'redux';


class UpdateLeave extends Component {

   componentDidMount() {
      const { leave_id } = this.props.match.params
      this.props.getLeave(leave_id)
      //console.log("propsonly", this.props)
   }

   //when submit is clicked
   onSubmit = e => {
      e.preventDefault();

      console.log('submit state: ', JSON.stringify(this.state))

      this.props.form.validateFields((err, fieldsValue) => {
         if (err) {
            // if got error, dont do anything
            return;
         }

         // Should format date value before submit.
         const rangeValue = fieldsValue["range-picker"];

         const updateLeave = {
            "id": this.props.leave.leave.id,
            "leaveType": fieldsValue['leave-type'],
            "startDate": rangeValue[0].format("YYYY-MM-DD"),
            "endDate": rangeValue[1].format("YYYY-MM-DD"),
            "reason": fieldsValue['reason'],
            "status": 'PENDING'
         };

         console.log("Received values of form: ", updateLeave);
         //here will submit form
         this.props.addLeave(updateLeave, this.props.history)
      });
   };

   disabledDate = (current) => {
      // Cannot select days before today and today
      return current && current < moment().endOf('day');
   }

   render() {

      console.log("props: ", JSON.stringify(this.props))
      console.log("state: ", JSON.stringify(this.state))

      //for layout
      const { Header, Content, Footer } = Layout;

      const { getFieldDecorator } = this.props.form;

      // values from global state
      const { leaveType, startDate, endDate, reason } = this.props.leave.leave

      // fieldDecorator options for Datepicker.Rangepicker
      const dateFormat = 'YYYY-MM-DD';
      const rangePickerFieldDecorator = [{
         rules: [{ type: "array", required: true, message: "Please select date!" }],
         initialValue: [moment(startDate, dateFormat), moment(endDate, dateFormat)]
      }];

      // fieldDecorator options for Select
      const leaveTypeFieldDecorator = [{
         rules: [{ required: true, message: "Please select leave type!" }],
         initialValue: leaveType
      }]

      // fieldDecorator options for Select
      const reasonFieldDecorator = [{
         initialValue: reason
      }]

      return (
         <Layout>
            <Header>
               {/* pass props to choose default selected tab */}
               <MenuHeader />
            </Header>
            <Content>
               <Col style={{ margin: '24px 24px 24px 24px' }} span={5} push={9} >
                  <h1>Leave Request</h1>
                  <Form onSubmit={this.onSubmit}>
                     {/* -----------select menu----------- */}
                     <Form.Item>
                        {getFieldDecorator("leave-type", ...leaveTypeFieldDecorator)(
                           <Select
                              placeholder="Leave type"
                           //value={this.state.leaveType}
                           >
                              <Select.Option value="Annual">Annual</Select.Option>
                              <Select.Option value="Medical">Medical</Select.Option>
                              <Select.Option value="Unpaid">Unpaid</Select.Option>
                           </Select>
                        )}
                     </Form.Item>

                     {/* -----------date range picker----------- */}
                     <div style={{ margin: '24px' }} />
                     <Form.Item>
                        {getFieldDecorator("range-picker", ...rangePickerFieldDecorator)(<DatePicker.RangePicker
                           disabledDate={this.disabledDate}
                        //initialValue={[moment('2020-03-12', dateFormat), moment('2020-03-15', dateFormat)]}
                        //format={dateFormat}
                        />)}
                     </Form.Item>

                     {/* -----------textarea----------- */}
                     <div style={{ margin: '24px' }} />
                     <Form.Item>
                        {getFieldDecorator('reason', ...reasonFieldDecorator)
                           (<TextArea
                              placeholder="Reason for leave"
                              allowClear //gives the X button on top right
                              autoSize={{ minRows: 6, maxRows: 6, }} //fixes row at 6
                           />)
                        }

                     </Form.Item>

                     {/* -----------buttons----------- */}
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
         </Layout>
      )
   }
}

//functions and objects need for this componenet
UpdateLeave.propTypes = {
   leave: PropTypes.object.isRequired,
   addLeave: PropTypes.func.isRequired,
   getLeave: PropTypes.func.isRequired,
   addLeave: PropTypes.func.isRequired,
}

//global state(redux), apply to local props
const mapStateToProps = state => ({
   leave: state.leave,
})

export default compose(connect(mapStateToProps, { getLeave, addLeave }), Form.create())(UpdateLeave)