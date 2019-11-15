import React, { useState, useEffect } from "react";
import { useRouteMatch, Route, Link, Switch } from "react-router-dom";

// import Details from "./Details";

import "./App.css";
import AddEditItem from "./AddEditItem";

// function Product({ apiFacade }) {
function Product(props) {
  const { items, editItem, deleteItem, findItem, storeAddEditItem } = props;

  // const [items, setitems] = useState([]);
  // const [itemsChanged, setitemsChanged] = useState(false);

  // useEffect(() => {
  //   setitems([...apiFacade.getitems()]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [itemsChanged]);

  let { path, url } = useRouteMatch();
  console.log("--->", path);
  console.log("-URL->", url);
  console.log("Product: ", props);

  // const deleteAndRefresh = id => {
  //   console.log("ID", id);
  //   apiFacade.deleteitem(id);
  //   setitemsChanged(!itemsChanged);
  // };

  const lis = items.map(item => {
    return (
      <li key={item.id}>
        {item.title}
        &nbsp;
        <Link to={`${url}${item.id}`}>details</Link>
        {/* ,&nbsp;
        <a
          href="/#"
          onClick={e => {
            e.preventDefault();
            deleteAndRefresh(item.id);
          }}
        >
          delete
        </a> */}
      </li>
    );
  });

  return (
    <div>
      <h2>Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {/*Add the rows here */}
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={e => {
                    e.preventDefault();
                    deleteItem(item.id);
                  }}
                >
                  Del
                </button>
              </td>
              <td>
                <Link to={`${url}/${item.id}`}>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Route path="/products/:id">
        <AddEditItem
          items={items}
          findItem={findItem}
          addEditItem={storeAddEditItem}
        />
      </Route>
      {/* <ul>{lis}</ul> */}
      {/* <p>item details for selected item will go here</p> */}
      {/* <Switch>
        <Route exact path={path}>
          <h3>Please select a item.</h3>
        </Route>
        <Route path={`${path}/:itemId`} exact>
          <AddEditItem
            editItem={editItem}
            deleteItem={deleteItem}
            findItem={findItem}
          />
        </Route>
        <Route path={`${path}/delete/:itemId`}>
          <Delete apiFacade={apiFacade} />
        </Route> 
      </Switch> */}
    </div>
  );
}

export default Product;
