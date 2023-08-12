import React,{useContext} from 'react';
import Button from './button';
import './loggedIn.css';
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/notesContext";


function Navbar() {
  const navigate=useNavigate();
  const context=useContext(noteContext);
  const {user}=context;

  const handleLogout=()=>{
    localStorage.removeItem('tkn');
    navigate("/login",{replace:true});
  }
  return (
    <div className='navbar'>
      <img src={logo} alt="logo.png" />
      <div className="right">
        {!localStorage.getItem('tkn')?<><Button title="Login" goto="/login"/>
            <Button title="Sign Up" goto="/signup"/></>:<><div className="name" >{user}</div><Button title="Logout" toggleClick={handleLogout}/></>}
      </div>
    </div>
  )
}

export default Navbar
