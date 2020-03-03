import React, { Component } from 'react'
import { Layout, Col, Button, Row, Form, Input } from 'antd'
import logo from './../../images/workspez_logo.png'
import { Link, Redirect } from 'react-router-dom'
import { getEmpDetails } from "../../actions/authenticatorActions";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GET_EMP_DETAILS, GET_ADMIN_DETAILS } from '../../actions/types';

// const resetReduxStore = () => {
//    return dispatch => {
//       return (
//          dispatch({ type: GET_EMP_DETAILS, payload: {} }),
//          dispatch({ type: GET_ADMIN_DETAILS, payload: {} })
//       )

//    }
// }

class Login extends Component {

   componentDidMount = () => {
      console.log("this.props::: ", JSON.stringify(this.props))
      resetReduxStore()

   }

   testRedirect = () => {
      return <Redirect to="/employee/leave/" />
   }

   onSubmit = e => {
      e.preventDefault()

      this.props.form.validateFields((err, fieldsValue) => {
         if (err) {
            // if got error, dont do anything
            return;
         }

         this.props.getEmpDetails(fieldsValue["username"], this.props.history)
         //this.testRedirect()
         console.log("bruh")
      })

   }

   render() {

      //const { Header, Content, Footer } = Layout
      const { getFieldDecorator } = this.props.form;

      const usernameFieldDecorator = [{
         //initialValue: 'Medical',
         rules: [{ required: true, message: "Please select leave type!" }]
      }]

      return (
         <Layout>
            <Layout.Content>
               <Col style={{ margin: '24px 24px 24px 24px' }} span={5} push={9} >
                  <img src={logo} width='300' height='100' style={{ margin: '0 0 24px' }} />
                  <Row type="flex" justify="space-around">
                     <Form onSubmit={this.onSubmit}>
                        <Form.Item>
                           {getFieldDecorator("username", { ...usernameFieldDecorator })(
                              <Input placeholder="Username" />
                           )}
                        </Form.Item>
                        <Form.Item>
                           <Button type="primary" htmlType="submit">
                              Submit
                        </Button>
                        </Form.Item>
                     </Form>
                     <Button>
                        <Link to='employee/leave'>
                           Employee(no login)
                        </Link>
                     </Button>
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