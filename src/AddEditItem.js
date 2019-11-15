import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddEditItem(props) {
  const { items, addEditItem } = props;
  const itemId = useParams().id;
  const [item, setItem] = useState(
    itemId
      ? items.find(i => i.id.toString() === itemId)
      : { id: "", title: "", info: "" }
  );

  /* Add the required changes to use Reacts "Controlled Component Pattern" 
     to handle inputs related to a item */
  const handleChange = evt => {
    const target = evt.target;
    const id = target.id;
    const value = target.value;
    setItem({ ...item, [id]: value });
  };

  const handleSubmit = evt => {
    if (item.title === "") {
      return;
    }
    addEditItem(item);
    evt.preventDefault();
  };

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              id="id"
              onChange={handleChange}
              value={item.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="title">
            Title:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="title"
              placeholder="Enter Title"
              onChange={handleChange}
              value={item.title}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="info">
            Info:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="info"
              placeholder="Enter info"
              onChange={handleChange}
              value={item.info}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              style={{ marginLeft: 5 }}
              type="button"
              className="btn btn-dark"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <p>Please provide me with the ability to create new items</p>
      <p>And update the backend when submitted</p>
      <p>{JSON.stringify(item)}</p>
    </div>
  );
}
