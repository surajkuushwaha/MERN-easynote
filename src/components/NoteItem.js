import React from 'react';

const NoteItem = (props) => {
    const { note } = props;

    return <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5><i className="fas fa-trash-alt mx-2"></i>
                    <i className="fas fa-edit mx-2"></i>

                </div>

                <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, enim eos nam repellendus neque velit alias quaerat voluptatibus delectus, quidem cumque dignissimos quam ut incidunt qui corrupti, fugiat quae nisi.</p>

            </div>
        </div>
    </div>;
};

export default NoteItem;
