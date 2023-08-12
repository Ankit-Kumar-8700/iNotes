import React,{ useContext ,useState} from 'react';
import './noteitem.css';
import temp from './temp.png';
import noteContext from '../context/notes/notesContext';
import NoteForm from './noteForm';
import DescriptionBox from './descriptionBox';



function Noteitem(props) {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const [zid,setZid]=useState(-4);

  const toggleZid=()=>{
    if(zid===4){
      setZid(-4);
    } else {
      setZid(4);
    }
  }

  const [descid,setDescid]=useState(-4);

  const toggleDescid=()=>{
    if(descid===4){
      setDescid(-4);
    } else {
      setDescid(4);
    }
  }

  return (
    <div className='noteitem'>
      <DescriptionBox title={props.note.title} description={props.note.description} descid={descid} toggleDescid={toggleDescid}/>
      <NoteForm heading="Update Note" title="Update" id={props.note._id} titState={props.note.title} descState={props.note.description} tagState={props.note.tag} picState={props.note.img} zid={zid} toggleZid={toggleZid}/>
      <img src={props.note.img?props.note.img:temp} alt="click.png" />
      <br />
      <div className='notetitle' >
        {props.note.title}
      </div>
      <hr style={{width:"95%"}}/>
      <div className="notetag">{props.note.tag}</div>
      <div className="notedate">{props.note.date}</div>
      <button className='notebtn' onClick={toggleDescid}>Description</button>
      <div className="changes">
      <i className="fa-solid fa-file-pen" onClick={toggleZid}></i>
      <i className="fa-regular fa-trash-can" onClick={()=>{deleteNote(props.note._id)}}></i>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,192L60,170.7C120,149,240,107,360,101.3C480,96,600,128,720,154.7C840,181,960,203,1080,197.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    </div>
  )
}

export default Noteitem;
