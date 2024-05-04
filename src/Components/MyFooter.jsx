import { Container, Row, Col, NavLink } from "react-bootstrap";

let MyFooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={12}>
            <div className="my-3 ">
              <i className="fab fa-facebook-f mx-2"></i>

              <i className="fab fa-instagram"></i>
            </div>

            <div className="mb-3">
              <NavLink disabled>Contacts</NavLink>
            </div>
            <div className="mb-3">
              <NavLink disabled>Terms & Conditions</NavLink>
            </div>
            <div className="mb-3">
              <NavLink disabled className="fs-6">
                Company Information
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
      <span className="d-block text-center mt-2">
        © SkyView Forecast. All Rights Reserved.
      </span>
    </footer>
  );
};

export default MyFooter;
