import { createRef, useContext, useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import API from "../api";
import PlayerContext from "../store/PlayerContext";

const LoginForm: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const history = useHistory();
  const [invalid, setInvalid] = useState(false);
  const nameInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setInvalid(false);

    const name = nameInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    API.login(name, password)
      .then((response) => {
        if (response.status === 201 || response.status === 204) {
          playerContext.loginPlayer(name);
          history.push("/"); // TODO: is replace better?
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setInvalid(true);
        }
      });
  };

  return (
    <Form onSubmit={loginHandler}>
      <Form.Group>
        <Form.Label>Player name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter player name"
          ref={nameInputRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          isInvalid={invalid}
          ref={passwordInputRef}
        />
        <Form.Control.Feedback type="invalid">
          Something is not right. Make sure you entered the right password or
          pick a different name.
        </Form.Control.Feedback>
      </Form.Group>
      <p className="pt-3">
        New here? Pick any name and password to get started!
      </p>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
