import React, { Component } from 'react'
import { Layout, Col, Button, Row } from 'antd'
import logo from './../../images/workspez_logo.png'
import { Link } from 'react-router-dom'

class Login extends Component {
   render() {

      //const { Header, Content, Footer } = Layout

      return (
         <Layout>
            <Layout.Content>
               <Col style={{ margin: '24px 24px 24px 24px' }} span={5} push={9} >
                  <img src={logo} width='300' height='100' style={{ margin: '0 0 24px' }} />
                  <Row type="flex" justify="space-around">
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

export default Login