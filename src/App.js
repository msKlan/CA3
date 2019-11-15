import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Prompt,
  useHistory,
  useParams,
  Redirect
} from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Product from "./Product";
import AddEditItem from "./AddEditItem";
import Login from "./Login";

import "./App.css";

function Additem({ apiFacede }) {
  const emptyitem = { id: "", title: "", info: "" };
  const [item, setitem] = useState({ ...emptyitem });
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    setitem({ ...item, [id]: value });
    setIsBlocking(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    apiFacede.additem(item);
    setitem({ ...emptyitem });
    setIsBlocking(false);
  };
  return (
    <div>
      <h2>Add item</h2>
      <form>
        <input
          id="title"
          value={item.title}
          placeholder="Add title"
          onChange={handleChange}
        />
        <br />
        <input
          id="info"
          value={item.info}
          placeholder="Add Info"
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
      <Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No Match found for this</h2>
    </div>
  );
}

function App({ apiFacade, match }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emptyItem = { id: "", title: "", info: "" };
  const [itemToAddEdit, setItemToAddEdit] = useState(emptyItem);
  const [items, setItems] = useState([]);

  let history = useHistory();

  const login = (username, password) => {
    console.log(username, password);
    apiFacade
      .login(username, password)
      .then(data => {
        console.log("BBBB", data);
        setIsLoggedIn(data);
      })
      .catch(err => console.log("Ups login:" + err));
    // setIsLoggedIn(status);
    history.push("/products");
  };

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };

  useEffect(() => {
    //This would be a great place to fetch data (all persons) from the backend
    getItems();
  }, [apiFacade]);

  const getItems = () => {
    console.log("getItems:", apiFacade);
    apiFacade
      .getItems()
      .then(data => {
        setItems(data);
      })
      .catch(err => console.log("Ups refreshitems:" + err));
  };

  const findItem = id => {
    getItems();
    console.log("getItem:", id);
    console.log(
      "getItem:",
      items
      // items.find(item => item.id === id)
    );
    return items.find(item => item.id === id);
    // apiFacade
    //   .findItem(id)
    //   .then(data => {
    //     setItems(data);
    //   })
    //   .catch(err => console.log("Ups getItem:" + err));
  };

  const storeAddEditItem = item => {
    //Call this from the AddEditPerson control with the person to Add or Edit and Add/Edit via the apiFacade
    console.log("storeAddEditItem1:", item);

    apiFacade
      .addEditItem(item)
      .then(data => {
        console.log("storeAddEditItem2:", data);
        getItems();
      })
      .catch(err => console.log("Ups storeAddEditPerson:" + err));
  };

  const deleteItem = id => {
    //Call this from the AllPerson control with the id for the person to delete
    console.log("app.deleteItem:", id);

    apiFacade
      .deleteItem(id)
      .then(data => {
        console.log("deleteItem2:", data);
        getItems();
      })
      .catch(err => console.log("Ups deleteItem:" + err));
  };

  const editItem = item => {
    //Call thisfrom the AllPerson control with the  person to edit
    //Set the state variable personToAddEdit with this person (a clone) to make the new value flow down via props
    console.log("editItemXX: ", item);
    setItemToAddEdit(item);
    history.push("/add-edit-item/");
  };

  return (
    <div>
      <Nav loginMsg={isLoggedIn ? "Logout" : "Login"} isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products" exact>
          <Product
            items={items}
            editItem={editItem}
            deleteItem={deleteItem}
            findItem={findItem}
            storeAddEditItem={storeAddEditItem}
          />
        </Route>
        <Route path="/add-item">
          <Additem apiFacede={apiFacade} />
        </Route>
        {/* <Route path="/products/:id">
          <AddEditItem
            items={items}
            findItem={findItem}
            addEditItem={storeAddEditItem}
          />
        </Route> */}
        <Route path="/login-out">
          <Login
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
            login={login}
          />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
