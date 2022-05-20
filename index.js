
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { buildQueries } from "@testing-library/react";
import React, { useState } from "react";
import ReactDOM from "react-dom/client"; 
import { useNavigate } from "react-router-dom";
import "./style.css";

function App() {
  const navigate=useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form" >
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <div>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
          </div>
        </div>
        <div className="input-container">
          <label>Password </label>
          <div>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
          </div>
        </div>
        <div className="input-container">
          <label>Conform Your Password </label>
          <div>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
          </div>
        </div>
        <div className="input-container">
          <label>Your Full Name</label>
          <div>
          <input type="text" name="pass" required />
          {renderErrorMessage("pass")}
          </div>
        </div>
        <div className="input-container">
          <label>Your Phone Number</label>
          <div>
          <input type="text" name="pass" required />
          {renderErrorMessage("pass")}
          </div>
        </div>
        <div className="check">
          <input type ="checkbox" name="check" />
          <label for ="check" > I read and agree Terms and Conditions</label>
        </div>
        <div className="button-container">
          <input type="submit" value="Create account" onClick={()=>navigate("/d3")} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app" >
      <div className="login-form">
        <div className="title">Create an account</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

var root =ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);