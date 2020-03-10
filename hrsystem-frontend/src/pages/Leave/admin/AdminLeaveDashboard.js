import React, { Component } from 'react'
import AdminLeaveCard from './widget/AdminLeaveCard'
import { Card, Layout, Row, Col, Empty } from 'antd'
import MenuHeader from '../../../components/MenuHeader'
import { getLeaves } from "../../../actions/adminLeavesActions";
import { connect } from 'react-redux'

class AdminLeaveDashboard extends Component {

   componentDidMount() {
      this.props.getLeaves()
   }

   render() {

      const { Header, Content, /*Footer*/ } = Layout;

      const { allLeaves } = this.props.allLeaves
      console.log('AdminLeaveDashBoard allLeaves:::', allLeaves)

      //pending
      let pendingLeaves = []

      //approved
      let approvedLeaves = []

      //rejected
      let rejectedLeaves = []

      const BoardAlgorithm = allLeaves => {
         const cards = allLeaves.map(leaveDetails => (
            <AdminLeaveCard key={leaveDetails.id} leaveDetails={leaveDetails} />
         ))

         for (let i = 0; i < allLeaves.length; i++) {
            if (cards[i].props.leaveDetails.status === "PENDING") {
               pendingLeaves.push(cards[i])
            }
            if (cards[i].props.leaveDetails.status === "APPROVED") {
               approvedLeaves.push(cards[i])
            }
            if (cards[i].props.leaveDetails.status === "REJECTED") {
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
               <MenuHeader selectedKey='adminLeave' />
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
   allLeaves: state.leaveDetails
})

//connect component to global state
export default connect(mapStateToProps, { getLeaves })(AdminLeaveDashboard)