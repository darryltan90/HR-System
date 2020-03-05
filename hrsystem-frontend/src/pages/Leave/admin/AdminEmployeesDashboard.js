import React, { Component } from 'react'
import { Layout, Table, Col, Row, Icon } from 'antd'
import MenuHeader from '../../../components/MenuHeader'


class AdminEmployeeDashboard extends Component {
   componentDidMount() {
      //this.props.(get all employee function)
   }

   render() {
      const { Header, Content, /*Footer*/ } = Layout

      // title, dataIndex, key, action
      const columnDetails = [
         { title: 'ID', dataIndex: 'empId', key: 'empId', width: 70, align: 'center' },
         { title: 'Name', dataIndex: 'empName', key: 'empName' },
         { title: 'Email', dataIndex: 'email', key: 'email', width: 400 },
         { title: 'Role', dataIndex: 'empType', key: 'empType', width: 150 },
         {
            title: 'Actions', key: 'actions', render: () =>
               <Row justify='space-around'>
                  <div style={{ marginLeft: '20px' }}>
                     <Icon
                        type="delete"
                        theme="twoTone"
                        twoToneColor="red"
                        style={{ fontSize: 'large' }}
                     />
                     <Icon
                        type="edit"
                        theme="twoTone"
                        style={{ fontSize: 'large' }}
                     />
                  </div>
               </Row>
         }
      ]
      // const {employees} = this.props.employees //needs mapStateToProps

      // this.props.empDetails (use map and loop)
      const empDetails = [
         { 'empId': 1, 'empName': 'name-1', 'email': 'email-1', 'empType': 'admin' },
         { 'empId': 2, 'empName': 'name-2', 'email': 'email-2', 'empType': 'employee' },
         { 'empId': 3, 'empName': 'name-3', 'email': 'email-3', 'empType': 'employee' },
      ]

      return (
         <Layout>
            <Header>
               <MenuHeader selectedKey="employees" />
            </Header>
            <Content>
               {/* <Row justify="space-around"> */}
               <Col span={20} style={{ margin: '50px 0px 24px 120px' }}>
                  <Table
                     dataSource={empDetails}
                     columns={columnDetails}
                     bordered
                  />
               </Col>
               {/* </Row> */}

            </Content>
         </Layout>
      )
   }
}

export default AdminEmployeeDashboard