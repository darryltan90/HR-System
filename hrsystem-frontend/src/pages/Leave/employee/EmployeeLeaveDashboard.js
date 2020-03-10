import React, { Component } from 'react'
import LeaveCard from './widget/LeaveCard'
import { Card, Layout, Row, Col, Button, Empty } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getEmpLeaves } from "../../../actions/employeeLeavesActions";
import { connect } from 'react-redux'

class EmployeeLeaveDashboard extends Component {

   componentDidMount() {
      console.log("EmployeeLeaveDashboard this.props.auth:: ", JSON.stringify(this.props.auth))
      this.props.getEmpLeaves(this.props.auth.empId)
   }

   render() {

      const { Header, Content, /*Footer*/ } = Layout;

      const { allLeaves } = this.props.allLeaves

      //pending
      let pendingLeaves = []

      //approved
      let approvedLeaves = []

      //rejected
      let rejectedLeaves = []

      const BoardAlgorithm = allLeaves => {
         const cards = allLeaves.map(leave => (
            <LeaveCard key={leave.id} leave={leave} empId={leave.empId} />
         ))

         for (let i = 0; i < allLeaves.length; i++) {
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

         // if nothing in any column, <Empty /> is rendered instead
         const nothing = <Empty key='nothing' />
         if (pendingLeaves.length === 0) {
            console.log('nothing in pending column')
            pendingLeaves.push(nothing)
         }
         if (approvedLeaves.length === 0) {
            console.log('nothing in approved column')
            approvedLeaves.push(nothing)
         }
         if (rejectedLeaves.length === 0) {
            console.log('nothing in rejected column')
            rejectedLeaves.push(nothing)
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
               <MenuHeader selectedKey="leave" />
            </Header>
            <Content>
               {BoardAlgorithm(allLeaves)}
            </Content>
         </Layout>
      )
   }
}

// mapping global state to local props
const mapStateToProps = state => ({
   auth: state.auth.employee,
   allLeaves: state.leave
})

//connect component to global state
export default connect(mapStateToProps, { getEmpLeaves })(EmployeeLeaveDashboard)