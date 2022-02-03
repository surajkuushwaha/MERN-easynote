import React from 'react';

const NoteItem = (props) => {
    const { note } = props;

    return <div className='col-md-3'>
        <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, enim eos nam repellendus neque velit alias quaerat voluptatibus delectus, quidem cumque dignissimos quam ut incidunt qui corrupti, fugiat quae nisi.</p>
                    <a href="/" className="btn btn-danger">Delete</a>
                </div>
        </div>
    </div>;
};

export default NoteItem;
