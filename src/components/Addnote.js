import React, { useContext, useState } from 'react';
import noteContext from '../context/Notes/noteContext';


const Addnote = () => {

    const context = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });
    const { addNote } = context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }



    return <div>
        <div className="container my-3">
            <h1>Add a note</h1>
            <form className='my-3' >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input onChange={onChange} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    </div>;
};

export default Addnote;
