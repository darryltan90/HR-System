import React, { Component } from 'react'
import LeaveCard from './widget/LeaveCard'
import { Card, Layout, Row, Col, Button } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getEmpLeaves } from "../../../actions/employeeLeavesActions";
import { connect } from 'react-redux'

class EmployeeLeaveDashboard extends Component {

   componentDidMount() {
      console.log(JSON.stringify(this.props.auth))
      this.props.getEmpLeaves(this.props.auth.empId)
      //back end change return type to return all leaves, not only specific 1 leave
   }

   render() {

      const { Header, Content, Footer } = Layout;

      const { leaves } = this.props.leaves

      //pending
      let pendingLeaves = []

      //approved
      let approvedLeaves = []

      //rejected
      let rejectedLeaves = []

      const BoardAlgorithm = leaves => {
         const cards = leaves.map(leave => (
            <LeaveCard key={leave.id} leave={leave} />
         ))

         for (let i = 0; i < leaves.length; i++) {
            if (cards[i].props.leave.status === "PENDING") {
               pendingLeaves.push(cards[i])
            }
            if (cards[i].props.leave.status === "APPROVED") {
               approvedLeaves.push(cards[i])
            }
            if (cards[i].props.leave.status === "REJECTED") {
               rejectedLeaves.push(cards[i])
            }
         }
         return (
            <Col style={{ margin: '24px 24px 24px 24px' }}>
               <Button type='primary' style={{ margin: '0 0 24px' }} >
                  <Link to='/employee/leave/newLeave'>
                     New leave
                  </Link>
               </Button>
               <Row gutter={16}>
                  <Col span={8}>
                     <Card title="Pending" >
                        {pendingLeaves}
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card title="Approved" >
                        {approvedLeaves}
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card title="Rejected" >
                        {rejectedLeaves}
                     </Card>
                  </Col>
               </Row>
            </Col>
         )
      }

      return (
         <Layout>
            <Header>
               {/* pass props to choose default selected tab */}
               <MenuHeader />
            </Header>
            <Content>
               {BoardAlgorithm(leaves)}
            </Content>
         </Layout>
      )

   }
}

// mapping global state to local props
const mapStateToProps = state => {
   //console.log("mapStateToProps", state.auth.employee)
   return ({
      auth: state.auth.employee,
      leaves: state.leave
   })
}

//connect component to global state
export default connect(mapStateToProps, { getEmpLeaves })(EmployeeLeaveDashboard)