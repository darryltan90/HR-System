import React, { Component } from 'react'
import { Calendar, Layout } from 'antd'
import MenuHeader from '../components/MenuHeader'

class CalendarDashboard extends Component {
   render() {

      const { Header, Content } = Layout

      return (
         <Layout>
            <Header>
               <MenuHeader selectedKey='calendar' />
            </Header>
            <Content>
               <Calendar />
            </Content>
         </Layout>
      )
   }
}

export default CalendarDashboard