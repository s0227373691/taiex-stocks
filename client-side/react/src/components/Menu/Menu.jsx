import "./Menu.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="Menu">
      <Navbar className="bg-body-tertiary">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>Finance</Navbar.Brand>
          </NavLink>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <NavLink to="/explor">
            <Navbar.Brand>explor</Navbar.Brand>
          </NavLink>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <NavLink to="/ticker">
            <Navbar.Brand>Ticker</Navbar.Brand>
          </NavLink>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
