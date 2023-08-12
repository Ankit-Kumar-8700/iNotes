import './authenticate.css';
import React, { useState,useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/notesContext";

function Login() {
    const context=useContext(noteContext);
    const {server}=context;
    const navigate=useNavigate();
    useEffect(()=>{
        const labels=document.querySelectorAll(".form-control label");
        labels.forEach((label)=>{
            label.innerHTML=label.innerText.split("").map((letter,idx)=>{
                return `<span style="transition-delay:${idx*50}ms">${letter}</span>`
            }).join("");
        });
    },[])
    
    const [credentials,setCredentials]=useState({email:"",password:""});
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`${server}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                "email":credentials.email,
                "password":credentials.password
            })
          });
          console.log(response);
          const res= await response.json();
          if(res.success){
            localStorage.setItem('tkn',res.token);
            navigate("/",{replace:true})
          } else {
            if(res.errors){
                for(let i=0;i<res.errors.length;i++){
                    alert(res.errors[i].msg);
                }
            } else {
                alert(res.error);
            }
          }
    }

    return (
      <div className="login">
        <div className="container">
            <h1>Sign In</h1>
            <form>
                <div className="form-control">
                    <input type="text" name="email" id="email" value={credentials.email} required onChange={handleChange}/>
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <input type="password" name="password" id="password" value={credentials.password} required onChange={handleChange}/>
                    <label>Password</label>
                </div>
                <button className="btnauth" onClick={handleSubmit}>Submit</button>
                <p className="text">Don't have an account?
                <a href="/signup">Create Account</a></p>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  