import React from 'react';

const LogSection = ({ log }) => {
    return (
        <div>
            <div className='text-center text-uppercase'><h3>upload logger</h3></div>
            <table className='fixed-table table table-condensed table-striped'>
                <thead>
                    <tr>
                        <th className='custom-width-10'>Id</th>
                        <th className='custom-width-20'>Time</th>
                        <th className='custom-width-10'>Platform</th>
                        <th className='custom-width-10'>Status</th>
                        <th className='custom-width-50'>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {log.map((entry, index) => (
                        <tr key={index}>
                            {entry.status === "error" || (entry.status === "success" && (entry.action === "quota limit")) ? (
                                <td colSpan="5">Error: {entry.message}</td>
                            ) : (
                                <>
                                    <td>{index+1}</td>
                                    <td>{entry.now}</td>
                                    <td>{entry.platform}</td>
                                    <td>{entry.status}</td>
                                    <td>
                                        <a href={entry.postUrl} target="_blank" rel="noopener noreferrer">{entry.postUrl}</a>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogSection;
