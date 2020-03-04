import React, { Component } from 'react'
import { Layout, Col, Button, Row, Form, Input } from 'antd'
import logo from './../../images/workspez_logo.png'
import { Link } from 'react-router-dom'
import { getEmpDetails } from "../../actions/authenticatorActions";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';


class Login extends Component {

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
   }

   render() {

      //const { Header, Content, /*Footer*/ } = Layout
      const { getFieldDecorator } = this.props.form;

      const usernameFieldDecorator = [{
         rules: [{ required: true, message: "Please enter username!" }]
      }]

      const passwordFieldDecorator = [{
         rules: [{ required: true, message: "Please enter password!" }]
      }]

      return (
         <Layout>
            <Layout.Content>
               <Col style={{ margin: '24px 24px 24px 24px' }} span={5} push={9} >
                  <img src={logo} alt="workspez logo" width='300' height='100' style={{ margin: '0 0 24px' }} />
                  <Row type="flex" justify="space-around">
                     <Form onSubmit={this.onSubmit}>
                        Username
                        <Form.Item>
                           {getFieldDecorator("username", ...usernameFieldDecorator)(
                              <Input placeholder="Username" />
                           )}
                        </Form.Item>
                        Password
                        <Form.Item>
                           {getFieldDecorator("password", ...passwordFieldDecorator)(
                              <Input.Password placeholder="password" />
                           )}
                        </Form.Item>
                        <Form.Item>
                           <Row type="flex" justify="space-around">
                              <Button type="primary" htmlType="submit">
                                 Login
                           </Button>
                           </Row>
                        </Form.Item>
                     </Form>
                     <Button>
                        <Link to='admin/leave'>
                           Admin(no login)
                        </Link>
                     </Button>
                  </Row>
               </Col>
            </Layout.Content>
         </Layout>
      )

   }
}

Login.propType = {
   getEmpDetails: PropTypes.func.isRequired
}

export default compose(connect(null, { getEmpDetails }), Form.create())(Login)
