import { useState } from "react";
import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { Button, Form } from "react-bootstrap";

//1. new user create
// 2.create user login
// 3.new create user verify email
//4 forget password
// 5 update name user
const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] =  useState('')

 const hanldeName = (event) => {
      setName(event.target.value) 
      
 }
 console.log(name);
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
    if (registered) {
      // user resister then login
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user, " al ready exists  users");
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        });
    } else {
      // create user register
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user, "create a new users");
          setEmail("");
          setError("");
          verifyEmail();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };
 // password reset 
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("forger password");
    });
  };
 
  //  update name
   const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
     console.log('updating name');
    }).catch((error) => {
      setError(error.message)
    });
   }

  //  send veifey email 
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log(" Email verification sent!");
    });
  };

  return (
    <div className="container w-50 mx-auto">
      <h1 className="text-primary">
        Please {registered ? "Login" : "register"}
      </h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onBlur={hanldeName}
            type="text"
            placeholder="Your Name"
            required
          />
        </Form.Group>

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
            label="all ready register"
          />
        </Form.Group>
        <h6 className="text-danger">{error}</h6>
        <Button onClick={handleForgetPassword} className="bg-primary">forget Password</Button>
        <br /> <br />
        <Button className="btn" variant="primary" type="submit">
          {registered ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
}

export default App;
