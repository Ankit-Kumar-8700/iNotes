import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';

import CreateAcc from "./authenticate/createAccount";
import Login from "./authenticate/login";
import Mainpage from "./loggedIn/mainpage";
import NoteState from "./context/notes/notesState";

function App() {
  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<CreateAcc />} />
          <Route exact path="/" element={<Mainpage/>} />
          <Route exact path="/home" element={<Mainpage/>} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
