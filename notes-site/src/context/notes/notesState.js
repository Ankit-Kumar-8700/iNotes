import React,{useState} from "react";
import NoteContext from "./notesContext";

const NoteState=(props)=>{
    const server="http://localhost:5000";
    const notesInitial=[];

    const [user,setUser]=useState("");

    const getNotes=async ()=>{
      const response = await fetch(`${server}/notes/getnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'tkn':localStorage.getItem('tkn')
        }
      });
      const res= await response.json();

      setNotes(res);

      const response2 = await fetch(`${server}/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'tkn':localStorage.getItem('tkn')
        }
      });
      const res2= await response2.json();
      if(res2.name){
        setUser(res2.name);
      }
  }

      const addNote=async (title,description,tag,img)=>{
          const response = await fetch(`${server}/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'tkn':localStorage.getItem('tkn')
            },
            body: JSON.stringify({title,description,tag,img})
          });
          const res= await response.json();

          setNotes(notes.concat(res));
      }

      const deleteNote=async (id)=>{
        const response = await fetch(`${server}/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'tkn':localStorage.getItem('tkn')
          }
        });
        const notes2=notes.filter((note)=>{return note._id!==id});
        setNotes(notes2);
      }

      const editNote=async (id,title,description,tag,img)=>{
        const response = await fetch(`${server}/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'tkn':localStorage.getItem('tkn')
          },
          body: JSON.stringify({title,description,tag,img})
        });
        const res= await response.json();
        for(let i=0;i<notes.length;i++){
          if(notes[i]._id===id){
            notes[i].title=title;
            notes[i].description=description;
            notes[i].tag=tag;
            notes[i].img=img;
          }
        }
        getNotes();
      }

      const [notes,setNotes]=useState(notesInitial);
    return (
        <NoteContext.Provider value={{server,notes,setNotes,addNote,deleteNote,editNote,getNotes,user}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState