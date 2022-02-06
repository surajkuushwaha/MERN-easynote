import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);




    // Get All notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOTA4Nzg5MDkzNTIyMTNkNjUzMzhiIn0sImlhdCI6MTY0MzcxMTE5MX0.LhSECMSYgkIafxyAA-sFbhRT8IoXIz_p5-5mrF9kA7I'
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOTA4Nzg5MDkzNTIyMTNkNjUzMzhiIn0sImlhdCI6MTY0MzcxMTE5MX0.LhSECMSYgkIafxyAA-sFbhRT8IoXIz_p5-5mrF9kA7I'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        console.log("Adding a new note");
        const note = {
            "_id": "61f9869eadffd0650394b659",
            "user": "61f90878909352213d65338b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-01T19:14:38.770Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOTA4Nzg5MDkzNTIyMTNkNjUzMzhiIn0sImlhdCI6MTY0MzcxMTE5MX0.LhSECMSYgkIafxyAA-sFbhRT8IoXIz_p5-5mrF9kA7I'
            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOTA4Nzg5MDkzNTIyMTNkNjUzMzhiIn0sImlhdCI6MTY0MzcxMTE5MX0.LhSECMSYgkIafxyAA-sFbhRT8IoXIz_p5-5mrF9kA7I'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;