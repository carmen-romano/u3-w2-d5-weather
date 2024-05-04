import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/weather-icon.webp";
import { Link } from "react-router-dom";

let MyNavbar = () => {
  return (
    <>
      <Navbar className="bgApp nav fw-bold mb-5">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo weather" width={50} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to={`/`} className="nav-link">
              Home
            </Link>
            <Nav.Link disabled>Forecasts</Nav.Link>
            <Nav.Link disabled>Winds and Seas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
