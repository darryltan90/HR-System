import React, { Component } from 'react'
import { Menu } from 'antd'

class MenuHeader extends Component {
   render() {
      return (
         <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['leaves']}
            style={{ lineHeight: '64px' }}
         >
            <Menu.Item key="calendar">Calendar</Menu.Item>
            <Menu.Item key="leaves">Leaves</Menu.Item>
         </Menu>
      )
   }
}

export default MenuHeader