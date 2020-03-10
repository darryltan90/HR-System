import React, { Component } from 'react'
import { Layout, Table, Col, Row, Icon, Button, Tag, Modal } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getAllEmp, getEmp, deleteEmp } from '../../../actions/adminEmployeeActions'
import { connect } from 'react-redux'


class AdminEmployeeDashboard extends Component {
   componentDidMount() {
      this.props.getAllEmp()
   }

   onEditClick = employee => {
      //dispatches the employee details to redux
      this.props.getEmp(employee)
   }

   onDeleteClick = employee => {
      console.log('delete modal click::', employee)

      const deleteEmp2 = this.props.deleteEmp

      Modal.confirm({
         title: 'Are you sure you want to delete this employee?',
         icon: <Icon
            type='exclamation-circle'
            style={{ fontSize: 'large' }}
         />,
         content:
            <b>
               ID: {employee.empId}<br />
               Name: {employee.empName}<br />
               Email: {employee.email}<br />
               Type: {employee.empType}<br />
            </b>,
         okText: 'Yes',
         okType: 'danger',
         cancelText: 'No',
         onOk() {
            console.log('delete modal ok click:::', employee.empId)
            deleteEmp2(employee.empId)
         }
      })
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
            //employee will be used to link delete and edit
            title: 'Actions', key: 'actions', render: (employee) =>
               <Row justify='space-around'>
                  <Col span={1}>

                     <Icon
                        type="delete"
                        theme="twoTone"
                        twoToneColor="red"
                        style={{ fontSize: 'large' }}
                        onClick={() => this.onDeleteClick(employee)}
                     />

                  </Col>
                  <Col span={1} push={2}>
                     <Link to='/admin/employee/updateEmployee'>
                        <Icon
                           type="edit"
                           theme="twoTone"
                           style={{ fontSize: 'large' }}
                           //inline function needed to pass values
                           onClick={() => this.onEditClick(employee)}
                        />
                     </Link>
                  </Col>
               </Row>
         }
      ]

      const empDetails = [
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
                     rowKey={row => row.empId}
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

export default connect(mapStateToProps, { getAllEmp, getEmp, deleteEmp })(AdminEmployeeDashboard)