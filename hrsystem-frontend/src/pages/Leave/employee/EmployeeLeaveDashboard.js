import React, { Component } from 'react'
import LeaveCard from './widget/LeaveCard'
import { Card, Layout, Row, Col, Button } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { Link } from 'react-router-dom'
import { getLeaves } from "../../../actions/leavesActions";
import { connect } from 'react-redux'

class EmployeeLeaveDashboard extends Component {

   componentDidMount() {
      this.props.getLeaves()
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
const mapStateToProps = state => ({
   leaves: state.leave
})

//connect component to global state
export default connect(mapStateToProps, { getLeaves })(EmployeeLeaveDashboard)