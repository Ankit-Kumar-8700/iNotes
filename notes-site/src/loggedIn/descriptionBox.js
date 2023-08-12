import React from 'react';
import Button from './button';

function DescriptionBox(props) {

  return (
      <div className='descriptionBox' style={props.descid===-4?{display:"none"}:{display: "flex",justifyContent: "center",alignItems:"center"}} >
        {console.log(props.descid)}
        <div className="innerDescBox">
          <div>
            <div className="descTitle">{props.title}</div>
            <hr style={{color:"white",width:"400px"}}/>
            </div>
            <div className="descDesc">{props.description}</div>
            <Button title="Close" toggleClick={props.toggleDescid}/>
        </div>
    </div>
  )
}

export default DescriptionBox;
