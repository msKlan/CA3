/* Import statements */
import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Products from './Products';
import {Login, fakeAuth} from './Login';

/* Home component */
const Home = ({match}) => {
  console.log(match);
  return (
  <div>
    <h2>Home</h2>
    <h3>Static landing page</h3>
  </div>
  );
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(fakeAuth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
};

/* App component */
class App extends React.Component {
  // const [authenticated, setAuthenticated] = useState(false);

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-info navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/products">{fakeAuth.isAuthenticated === true?"Logout":"Login"}</Link></li>
          </ul>
        </nav>        
    <p>{JSON.stringify(fakeAuth.isAuthenticated)}</p>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/products" component={Products} />
          </Switch>
      </div>
    )
  }
}
export default App;