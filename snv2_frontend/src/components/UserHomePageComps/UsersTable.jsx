import React from 'react';

const UsersTable = ({users, selectedUser, handleChooseUser}) => {
    return(
        <div>
            <div className='text-center text-uppercase'><h3>Users</h3></div>
            
            <table className='fixed-table table table-hover table-condensed'>
                <thead className='thead-dark'>
                    <tr>
                        <th className='custom-width-25'>ID</th>
                        <th className='custom-width-50'>Name</th>
                        <th className='custom-width-25'>Choose</th>
                    </tr>
                </thead>
            </table>
            <div className='scroll-part'>
                <table className='fixed-table table table-hover'>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className='custom-width-25'>{user.id.substring(user.id.length - 3)}</td>
                                <td className='custom-width-50'>{user.name}</td>
                                <td className='custom-width-25'>
                                    <button className={selectedUser === user ? "btn btn-secondary" : "btn btn-primary"} onClick={() => handleChooseUser(user)}>
                                        {selectedUser === user ? "Cancel" : "Choose"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UsersTable;
