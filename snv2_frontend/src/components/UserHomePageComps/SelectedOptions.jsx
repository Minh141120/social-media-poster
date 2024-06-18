import React from 'react';

const SelectedOptions = ({selectedPlatforms, selectedPosts, selectedUser, handleCancel, handleSubmit}) => {
    return(
        <div>
            <div className='text-center text-uppercase'><h3>selected options</h3></div>
            <table className='fixed-table table table-striped'>
                <thead>
                    <tr>
                        <th className='custom-width-10'>User Id</th>
                        <th className='custom-width-20'>Fullname</th>
                        <th className='custom-width-10'>Post Id</th>
                        <th className='custom-width-40'>Content</th>
                        <th className='custom-width-20'>Platforms</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedPosts.map((selectedPost) => (
                        <tr key={selectedPost.id}>
                            <td>{selectedUser?.id.substring(selectedUser.id.length - 3)}</td>
                            <td>{selectedUser?.name}</td>
                            <td>{selectedPost.id.substring(selectedPost.id.length - 3)}</td>
                            <td>{selectedPost.content}</td>
                            <td>{selectedPlatforms.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit} className='btn btn-success custom-width-50'>Post</button>
            <button onClick={handleCancel} className='btn btn-danger custom-width-50'>Cancel</button>
        </div>

    )
}

export default SelectedOptions;
