import React,{useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Noteitem from './noteitem';
import Addnoteitem from './addnoteitem';
import NoteForm from './noteForm';
import './loggedIn.css';
import noteContext from '../context/notes/notesContext';

function Mainpage() {
  const navigate=useNavigate();
  const context=useContext(noteContext);
  const {notes,getNotes}=context;
  useEffect(()=>{
    if(localStorage.getItem('tkn')){
      getNotes();
    } else {
      navigate("/login",{replace:true});
    }
  },[]);
  const [zid,setZid]=useState(-4);

  const toggleZid=()=>{
    if(zid===4){
      setZid(-4);
    } else {
      setZid(4);
    }
  }


  return (
    <div className='mainpage' style={{minHeight:"100vh",paddingBottom:"45px",backgroundColor:"#101010", color:"aqua"}}>
      <Navbar/>
      <NoteForm heading="Add Note" title="Add" titState="" descState="" tagState="" picState="" command="add" zid={zid} toggleZid={toggleZid}/>

      <p style={{display: 'flex',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'ui-rounded',
    textDecorationLine: 'underline'}}>NotePad</p>
    <div className="allNotes">
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note}/>
      })}
      <Addnoteitem toggleZid={toggleZid}/>
    </div>
    </div>
  )
}

export default Mainpage