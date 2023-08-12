import React,{useContext,useState} from "react";
import noteContext from "../context/notes/notesContext";
import Button from "./button";
import FileBase from "react-file-base64";

function NoteForm(props) {

  const context=useContext(noteContext);
  const {addNote,editNote}=context;
  // const {pic,setPic}=useState(props.picState);

  const [note,setNote]=useState({title:props.titState,description:props.descState,tag:props.tagState,img:props.picState});
  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  const handleSubmit=()=>{
    if(note.description.length<5 || note.title.length<3){
      if(note.description.length<5 && note.title.length<3) alert("Title must have at least 3 charcters and Description must have at least 5 characters!!");
      else if(note.description.length<5) alert("Description must have at least 5 characters!!");
      else alert("Title must have at least 3 charcters!!");
    }
    else{
      if(props.command==="add"){
        function validateFileType(){
          let element = document.getElementById("inputImage");
          let fileName=element.getElementsByTagName("input")[0].value;
          let idxDot = fileName.lastIndexOf(".") + 1;
          let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
          if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
              //TO DO
              addNote(note.title,note.description,note.tag,note.img);
              props.toggleZid();
              setNote({title:"",description:"",tag:"",img:""});
              element.getElementsByTagName("input")[0].value=null;
          }else{
              alert("Only jpg/jpeg and png files are allowed!");
          }   
        }
        validateFileType();
      } else {
          editNote(props.id,note.title,note.description,note.tag);
        props.toggleZid();
      }
    }
  }
  const handleCancel=()=>{
    props.toggleZid();
    let element = document.getElementById("inputImage");
        element.getElementsByTagName("input")[0].value=null;
    setNote({title:props.titState,description:props.descState,tag:props.tagState,img:props.picState});
  }

  return (
    <div className="noteform"  style={props.zid===-4?{display:"none"}:{display: "flex",justifyContent: "center",alignItems:"center"}} >
        <div className="form">
        <p>{props.heading}</p>
    <form action="/action_page.php">
      <label htmlFor="title">Title:</label>
      <br />
      <input type="text" id="title" name="title" onChange={handleChange} minLength={3} required value={note.title}/>
      <br />
      <br />
      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        name="description"
        id="description"
        cols="40"
        rows="10"
        charswidth="23"
        style={{resize:"none"}}
        onChange={handleChange} minLength={5} required value={note.description}></textarea>
      <br />
      <br />
      <label htmlFor="tag">Tags:</label>
      <br />
      <input type="text" id="tag" name="tag" onChange={handleChange} value={note.tag}/>
      <br />
      {props.command==="add" && <div id="inputImage">
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) =>
          setNote({...note,img:base64})
        }
      />
      </div>}
      <br />
      <div className="choice" style={{ display: "flex", flexDirection: "row",justifyContent:"space-around" }}>
        <Button title="Cancel" style={{ width:"80px"}}  toggleClick={handleCancel}/>
        <Button title={props.title}  toggleClick={handleSubmit}/>
      </div>
    </form>
    </div>
        </div>
  );
}

export default NoteForm;
