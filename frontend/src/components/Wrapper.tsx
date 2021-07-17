import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Wrapper: React.FC = (props) => {
  return (
    <Container>
      <Row md={2} className="justify-content-md-center mt-5">
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
