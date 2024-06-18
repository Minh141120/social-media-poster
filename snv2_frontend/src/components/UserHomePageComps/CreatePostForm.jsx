import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

const CreatePostForm = ({ newPost, handleCreatePost, titleOnChange, contentOnChange, handleCancelCreate}) => {
    
    return (
        <div className="container">
            <h2 className="text-center">Create Post</h2>
            <form onSubmit={handleCreatePost}>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={newPost.title}
                        onChange={titleOnChange}
                    />
                </div>
                <div className="form-group" style={{ marginBottom:'10px'}}>
                    <label htmlFor="content"> Content: </label>
                    <input
                        type="text"
                        id="content"
                        className="form-control"
                        value={newPost.content}
                        onChange={contentOnChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{width: '100%', marginBottom:'10px'}}>Create Post</button>
                <button onClick={handleCancelCreate} className="btn btn-secondary btn-block" style={{width: '100%', marginBottom:'10px'}}>Cancel</button>
            </form>
        </div>
    )
}

export default CreatePostForm;
