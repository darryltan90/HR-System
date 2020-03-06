import React, { Component } from 'react'
import { Layout, Table, Col, Row, Icon, Button, Tag } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getAllEmp } from '../../../actions/adminEmployeeActions'
import { connect } from 'react-redux'


class AdminEmployeeDashboard extends Component {
   componentDidMount() {
      this.props.getAllEmp()
   }

   render() {
      const { Header, Content, /*Footer*/ } = Layout

      console.log('AdminEmployeeDashboard this.props.employees::: ', this.props.employees)

      // title, dataIndex, key, action
      const columnDetails = [
         { title: 'ID', dataIndex: 'empId', key: 'empId', width: 60, align: 'center' },
         { title: 'Name', dataIndex: 'empName', key: 'empName' },
         { title: 'Email', dataIndex: 'email', key: 'email', width: 400 },
         {
            title: 'Type',
            dataIndex: 'empType',
            key: 'empType',
            width: 150,
            render: empType => {
               let color = empType === 'admin' ? 'green' : 'blue';
               return (
                  <Tag color={color} key={empType}>
                     {empType.toUpperCase()}
                  </Tag>
               );
            }
         },
         {
            //empId will be used to link delete and edit for employee
            title: 'Actions', key: 'actions', render: (empId) =>
               <Row justify='space-around'>
                  <Col span={1}>
                     <a>
                        <Icon
                           type="delete"
                           theme="twoTone"
                           twoToneColor="red"
                           style={{ fontSize: 'large' }}
                        />
                     </a>
                  </Col>
                  <Col span={1} push={2}>
                     <a>
                        <Icon
                           type="edit"
                           theme="twoTone"
                           style={{ fontSize: 'large' }}
                        />
                     </a>
                  </Col>
               </Row>
         }
      ]
      // const {employees} = this.props.employees //needs mapStateToProps

      // this.props.empDetails (use map and loop)
      const empDetails = [
         // { 'empId': 1, 'empName': 'name-1', 'email': 'email-1', 'empType': 'admin' },
         // { 'empId': 2, 'empName': 'name-2', 'email': 'email-2', 'empType': 'employee' },
         // { 'empId': 3, 'empName': 'name-3', 'email': 'email-3', 'empType': 'employee' },
         ...this.props.employees.employees
      ]

      return (
         <Layout>
            <Header>
               <MenuHeader selectedKey="employees" />
            </Header>
            <Content>
               <Col span={20} style={{ margin: '50px 0px 24px 120px' }}>
                  <Button type='primary' style={{ marginBottom: '24px' }} >
                     <Link to='/admin/employee/newEmployee' >
                        New employee
                     </Link>
                  </Button>
                  <Table
                     dataSource={empDetails}
                     columns={columnDetails}
                     bordered
                  />
               </Col>
            </Content>
         </Layout>
      )
   }
}

const mapStateToProps = state => ({
   employees: state.employee
})

export default connect(mapStateToProps, { getAllEmp })(AdminEmployeeDashboard)