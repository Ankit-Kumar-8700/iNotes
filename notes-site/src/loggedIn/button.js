import React from 'react'
import './button.css';

function Button(props) {
  return (
    <div className='center' style={{margin:"5px"}}  onClick={props.toggleClick}>
      <a className='btn center' href={props.goto}>
                <p>{props.title}</p>
                <div className="d1"></div>
                <div className="d2"></div>
                <div className="d3"></div>
                <div className="d4"></div>
            </a>
    </div>
  )
}

export default Button
