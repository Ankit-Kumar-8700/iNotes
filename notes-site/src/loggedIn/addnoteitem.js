import './loggedIn.css';
import React from 'react';

function Addnoteitem(props) {
  return (
    <button className="card" onClick={props.toggleZid}>
  <div className="card-info" onClick={props.toggleZid}>
    <div className="title">
    <i className="fa-regular fa-square-plus"></i>
      <p>Add New Note</p>
    </div>
  </div>
</button>
  )
}

export default Addnoteitem
