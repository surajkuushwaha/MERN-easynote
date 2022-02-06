import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/Notes/noteContext';
import Addnote from './Addnote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const ref = useRef(null);
    const refclose = useRef(null);
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line      
    }, []);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const handleClick = (e) => {        
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (<>
        <Addnote />
        <button style={{ display: "none" }} type="button" ref={ref} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className='my-3' >
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input onChange={onChange} type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edesc" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edesc" name="edescription" onChange={onChange} value={note.edescription} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NoteItem key={note._id} updateNote={updateNote} note={note} />
            })}

        </div></>
    );
};

export default Notes;
