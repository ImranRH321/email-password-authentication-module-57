import logo from "./logo.svg";
import "./App.css";

function App() {
 
  const handleChangeBlur = event => {
    console.log(event.target.value);
}

const handleChangePassword = event => {
    console.log(event.target.value);
}

const handleOnSubmit = event => {
  console.log('form submit process');
  event.preventDefault()
}

  return (
    <div className="App">
         <h1>----------------------------------</h1> <br /><br />
         <form onSubmit={handleOnSubmit}>
           <input onBlur={handleChangeBlur} placeholder="your email" />
           <input onBlur={handleChangePassword} type="password"  placeholder="your password"/> 
           <br /><br />
           <input type="submit" value="login" />
         </form>
    </div>
  );
}

export default App;
