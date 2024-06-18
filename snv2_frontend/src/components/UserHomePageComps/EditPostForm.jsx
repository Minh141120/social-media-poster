import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EditPostForm = ({ post, handleEditPost, handleCancelEdit }) => {
    const [editedPost, setEditedPost] = useState(post);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleEditPost(editedPost);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    return (
        <div className="container">
            <h2 className="text-center">Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="editTitle">Title : </label>
                    <input
                        type="text"
                        id="editTitle"
                        name="title"
                        className="form-control"
                        value={editedPost.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group" style={{ marginBottom:'10px'}}>
                    <label htmlFor="editContent">Content : </label>
                    <input
                        type="text"
                        id="editContent"
                        name="content"
                        className="form-control"
                        value={editedPost.content}
                        onChange={handleChange}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block" style={{width: '100%', marginBottom:'10px'}}>Save</button>
                <button onClick={handleCancelEdit} className="btn btn-secondary btn-block" style={{width: '100%', marginBottom:'10px'}}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPostForm;
