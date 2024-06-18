import React, { useState } from 'react';
import "./OptionButton.css"

const OptionButton = ({ handleEditPostButtonClick, handleDeletePost }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="option-button-container" style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setShowOptions(!showOptions)}> ⋮ </button>
            {showOptions && (
                <div className="options-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                }}>
                    <button onClick={() => { handleEditPostButtonClick(); setShowOptions(false); }} style={{ display: 'block', width: '100%' }}>Edit</button>
                    <button onClick={() => { handleDeletePost(); setShowOptions(false); }} style={{ display: 'block', width: '100%' }}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default OptionButton;
