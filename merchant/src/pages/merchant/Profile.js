import { Col, Row } from "reactstrap"
import { CardProfile } from "../../modules"

const Profile = () => {
  return (
    <Row className="d-flex flex-column justify-content-between align-items-center">
      {/* Header */}
      <Col className='app-header p-4'>
          <div className='app-header_title pt-1'>
              {/* <h4>Profile</h4> */}
          </div>
      </Col>
      {/* End */}

      {/* Content */}
      <Col md="6" className="pt-4">
        <CardProfile />
      </Col>
    </Row>
  )
}

export default Profile
