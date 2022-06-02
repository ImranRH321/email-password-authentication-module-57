import { useState } from "react";
import "./App.css";
import app from "./firebase.init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = event => {
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
    <div className="text-center container">
      <h1>Register Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div class="">
          <label for="staticEmail" class="col-sm-2 col-form-label ">
            Email
          </label>
          <div>
            <input
              onBlur={handleEmailBlur}
              type="text"
              readonly
              className="flied"
              id="staticEmail"
            />
          </div>
        </div>
        <div class="">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="">
            <input
              onBlur={handlePasswordBlur}
              type="password"
              className="flied"
              id="inputPassword"
            />
          </div>
        </div>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default App;
