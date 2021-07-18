import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import PlayerContext from "../store/PlayerContext";

const Header: React.FC = () => {
  const playerContext = useContext(PlayerContext);

  const logout = () => {
    playerContext.logoutPlayer();
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Tic-Tac-Toe</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Lobby
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
