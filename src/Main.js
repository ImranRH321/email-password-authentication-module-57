import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "./firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(app);

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  // new user regester
  //  user exists is login
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  // form defaul off
  const submitForm = event => {
    /* ================react-form-valeded========================*/
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    /* ====================create-new-user-firebase=====================================*/
console.log(email, password);
    // console.log(auth, email, password, 'auth', 'email, password'); 
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });


    event.preventDefault();
  };

  return (
    <div className="bg-success">
      <div className="w-50 mx-auto bg-success p-5 text-white mt-3">
        <h1 className="text-dark">
          User <spn className="text-warning">Register</spn>
        </h1>
        <Form noValidate validated={validated} onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmail}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePassword}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid" className="text-danger">
              password shoded at last one specail cartch
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Main;
