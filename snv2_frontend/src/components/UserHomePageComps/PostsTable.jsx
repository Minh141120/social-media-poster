import React from 'react';
import OptionButton from '../ButtonComps/OptionButton';
import EditPostForm from './EditPostForm';
import { useState } from 'react';

const PostsTable = ({ posts, selectedPosts, handleChoosePost, handleEditPost, handleDeletePost }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editPost, setEditPost] = useState(null);

    const handleEditButtonClick = (postId) => {
        const postToEdit = posts.find(post => post.id === postId);
        setEditPost(postToEdit);
    };

    const handleEditFormSubmit = (editedPost) => {
        handleEditPost(editedPost);
        setEditPost(null);
    };

    const handleCancelEdit = () => {
        setEditPost(null);
    };

    return (
        <div> 
            <div className='text-center text-uppercase'><h3>posts</h3></div>
            <div className='table-container'>
                <table className='fixed-table table table-hover table-condensed'>
                    <thead className='thead-dark'>
                        <tr>
                            <th className='custom-width-10'>ID</th>
                            <th className='custom-width-60'>Content</th>
                            <th className='custom-width-15'>Choose</th>
                            <th className='custom-width-15'>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className='custom-width-10'>{post.id.substring(post.id.length - 3)}</td>
                                        <td className='custom-width-60'>{post.content}</td>
                                        <td className='custom-width-15'>
                                            <button className={selectedPosts.find(p => p.id === post.id) ? "btn btn-secondary" : "btn btn-primary"} onClick={() => handleChoosePost(post)}>
                                                {selectedPosts.find(p => p.id === post.id) ? "Cancel" : "Choose"}
                                            </button>
                                        </td>
                                        <td className="center-content custom-width-15">
                                            <OptionButton
                                                handleEditPostButtonClick={() => handleEditButtonClick(post.id)}
                                                handleDeletePost={() => handleDeletePost(post.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>              
                </table>

                <div className='scroll-part'>
                    <table className='fixed-table table table-hover'>
                    
                    </table>
                </div>
            </div>
            
            {/* {editPost && (
                <div className='edit-form-overlay'>
                    <EditPostForm
                        post={editPost}
                        handleEditPost={handleEditFormSubmit}
                        handleCancelEdit={handleCancelEdit}
                    />
                </div>
            )} */}

            {editPost && (
                <React.Fragment>
                    <div className="overlay"></div> 
                    <div className="edit-form-overlay">
                        <EditPostForm
                            post={editPost}
                            handleEditPost={handleEditFormSubmit}
                            handleCancelEdit={handleCancelEdit}
                        />
                    </div>
                </React.Fragment>
            )}    
        </div>
    );
};
export default PostsTable;
