import { Col, Container, Row } from "reactstrap"
import { CardProfile } from "../../modules"

const Profile = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        {/* Content */}
        <Col sm="12" md="6">
          <CardProfile />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
