const URL = "http://localhost:3333/api";
const backendURL = "http://localhost:8080/securitystarter";

// import "./settings";

function apiFacade() {
  let items = [];
  let nextId = 104;

  function makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    console.log("makeOptions", opts);
    return opts;
  }

  function handleHttpErrors(res) {
    console.log(res);
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  const setToken = token => {
    console.log(token);
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  //Insert utility-methods from a latter step (d) here
  const login = (user, pass) => {
    console.log("login0");
    const options = makeOptions("POST", {
      username: user,
      password: pass
    });
    console.log("login:", options);
    return fetch(backendURL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        return true;
      });
  };

  const getItems = () => {
    console.log("getItems: ", URL);
    console.log(fetch(URL).then(handleHttpErrors));
    return fetch(URL).then(handleHttpErrors);
    // return items;
  };

  function addEditItem(item) {
    //Complete me. A smart version will handle both Add and Edit, but focus on Add (POST) only first
    console.log("addEditItem1:", makeOptions("POST", item));
    const method = item.id ? "PUT" : "POST";
    const idParam = item.id ? "/" + item.id : "";
    console.log(method);
    return fetch(URL + idParam, makeOptions(method, item)).then(
      handleHttpErrors
    );
  }

  const findItem = id => {
    // Slettes ?
    const itemId = isNaN(id) ? id : Number(id);
    return items.find(item => item.id === itemId);
  };

  const deleteItem = id => {
    const itemId = isNaN(id) ? Number(id) : id;
    items = items.filter(item => item.id !== itemId);
  };

  const addItem = item => {
    item.id = nextId;
    items.push(item);
    nextId++;
  };

  return {
    // Remember all statements below are a shortcut for this version: getitems: getitems
    getItems,
    findItem,
    deleteItem,
    addItem,
    login
  };
}

// let returnVal = apiFacade();
// export default returnVal;
export default apiFacade();
