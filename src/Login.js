import React from 'react';
import { Redirect } from 'react-router-dom';


export class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      username: "",
      password: "" 
    };
    this.login = this.login.bind(this);
  }

  login() {
    console.log(1, this.state);
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
      console.log(2, this.state);
    })
  }

  onChange = (evt) => {
    this.setState({[evt.target.id]: evt.target.value})
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <h2>Login</h2>
        <form onChange={this.onChange} >
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          {/* <button type="submit">Log in</button> */}
        </form>
        <button onClick={this.login}>Log in</button>
        <p>{ JSON.stringify(this.state)}</p>
      </div>
    )
  }


}

/* A fake authentication function */

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  }
};
