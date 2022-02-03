import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "61f97da60c41ec927d0ada6b",
            "user": "61f90878909352213d65338b",
            "title": "My title",
            "description": "Wake up earhly",
            "tag": "personal",
            "date": "2022-02-01T18:36:22.443Z",
            "__v": 0
        },
        {
            "_id": "61f97da60c41ec927d0ada6d",
            "user": "61f90878909352213d65338b",
            "title": "My title",
            "description": "Wake up earhly",
            "tag": "personal",
            "date": "2022-02-01T18:36:22.826Z",
            "__v": 0
        },
        {
            "_id": "61f9869eadffd0650394b659",
            "user": "61f90878909352213d65338b",
            "title": "My title",
            "description": "Wake up earhly",
            "tag": "personal",
            "date": "2022-02-01T19:14:38.770Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;