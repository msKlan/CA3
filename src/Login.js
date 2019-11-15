import React, { useState } from "react";

export default function Login({ isLoggedIn, loginMsg, setLoginStatus, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = evt => {
    // console.log(evt);
  };

  const loginSubmit = () => {
    console.log(isLoggedIn, username, password);
    login(username, password);
    // setLoginStatus(!isLoggedIn);
  };

  const logout = evt => {
    console.log(isLoggedIn, evt);
    // setLoginStatus(!isLoggedIn);
  };

  return (
    <div>
      {!isLoggedIn && (
        <>
          <h2>Login</h2>
          <form id="f" onChange={onChange} onSubmit={loginSubmit}>
            <input
              placeholder="User Name"
              id="username"
              onChange={event => setUsername(event.target.value)}
            />
            <input
              placeholder="Password"
              id="password"
              onChange={event => setPassword(event.target.value)}
            />
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {isLoggedIn && (
        <>
          <h2>Do you really want to logout?</h2>
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </>
      )}
    </div>
  );
}
