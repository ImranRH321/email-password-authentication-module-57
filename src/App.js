import { useState } from "react";
import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle regester check handle ar
  const handleResisterCheck = event => {
    setRegister(event.target.checked);
  };

  // email input onBlur
  const handleEmailBlur = event => {
    setEmail(event.target.value);
  };

  //  password input onBlur
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  };
  // form submit onSubmit
  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("password is one specail carekter");
      return;
    }
    setError("");
    setValidated(true);
    // ..
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setError("");
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <div className="container w-50 mx-auto">
      <h1 className="text-primary">Please {registered? 'registered': 'Login'}</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please choose a email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            password one specail simple ...
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleResisterCheck}
            type="checkbox"
            label="Check me out"
          />
        </Form.Group>
        <h3 className="text-danger">{error}</h3>
        <Button className="btn" variant="primary" type="submit">
          {registered? 'Registered':'Login'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
