import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const UploadProgressBar = ({ uploading, progress }) => {
    if (!uploading) {
        return null;
    }

    return (
        <div className="my-3">
            Uploading... ଘ(੭ˊᵕˋ)੭ ੈ♡‧₊˚ 
            <ProgressBar animated striped now={progress} label={`${progress}%`} variant='secondary' />
        </div>
    );
};

export default UploadProgressBar;
