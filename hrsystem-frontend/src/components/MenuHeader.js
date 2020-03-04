import React, { Component } from 'react'
import { Menu, Row, Icon, Col, Popconfirm } from 'antd'
import logo from './../images/workspez_logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetReduxStore } from '../actions/authenticatorActions'
import { compose } from 'redux'

class MenuHeader extends Component {

   resetLoginDetail = e => {
      e.preventDefault()
      this.props.resetReduxStore()

   }
   render() {
      //const dispatch = useDispatch()
      //const resetAuth = { auth: { employee: {}, admin: {} } }
      return (
         //total 24 cols, 3(logo)+5(menu)+15+1(logout icon)
         <Row type="flex">
            <Col span={3}>
               <img src={logo} alt="workspez logo" width='150' height='50' />
            </Col>
            <Col span={5}>
               <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['leaves']}
                  style={{ lineHeight: '64px' }}
               >
                  <Menu.Item key="calendar">Calendar</Menu.Item>
                  <Menu.Item key="leaves">Leaves</Menu.Item>
               </Menu>
            </Col>
            <Col span={1} offset={15}>
               <Popconfirm
                  title={"Are you sure you want to log out?"}
                  placement="bottomRight"
                  //okText={this.onLogoutClick}
                  okText={<Link to='/'>Yes</Link>}
                  cancelText='No'
                  onConfirm={this.resetLoginDetail}
               >
                  <Icon
                     type="logout"
                     style={{ margin: '18px', color: 'red', fontSize: '28px' }}
                  />
               </Popconfirm>
            </Col>
         </Row>
      )
   }
}

export default compose(connect(null, { resetReduxStore }))(MenuHeader)