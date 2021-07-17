import Card from "react-bootstrap/Card";

import Wrapper from "../components/Wrapper";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <Wrapper>
      <Card>
        <Card.Header>Tic-Tac-Toe</Card.Header>
        <Card.Body>
          <LoginForm />
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

export default Login;
