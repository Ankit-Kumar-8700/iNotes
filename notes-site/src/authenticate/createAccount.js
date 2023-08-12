import './authenticate.css';
import React, { useState,useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/notesContext";

function CreateAcc() {
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
    
    const [credentials,setCredentials]=useState({username:"",email:"",password:""});
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        if(credentials.username.length<3 || credentials.email.length<3 || credentials.password.length<5){
            alert("Invalid Credentials");
        } else {
            e.preventDefault();
            const response = await fetch(`${server}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                "name":credentials.username,
                "email":credentials.email,
                "password":credentials.password
            })
          });
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
    }

    return (
      <div className="CreateAcc">
        <div className="container">
            <h1>Enter Details</h1>
            <form>
            <div className="form-control">
                    <input type="text" name="username" id="username" onChange={handleChange} minLength={3} required />
                    <label>Username</label>
                </div>
                <div className="form-control">
                    <input type="text" name="email" id="email" onChange={handleChange} minLength={3} required />
                    <label>Email</label>
                </div>
                <div className="form-control">
                    <input type="password" name="password" id="password" onChange={handleChange} minLength={5} required />
                    <label>Password</label>
                </div>
                <button className="btnauth" onClick={handleSubmit}>Create</button>
                <p className="text">Already have an account?
                <a href="/login">Sign In</a></p>
            </form>
        </div>
      </div>
    );
  }
  
  export default CreateAcc;
  