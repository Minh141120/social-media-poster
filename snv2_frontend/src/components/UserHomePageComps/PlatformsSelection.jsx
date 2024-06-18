import React from 'react';

const PlatformsSelection = ({ platforms, selectedPlatforms, handleTogglePlatform }) => {
    return (
        <div className="form-group">
            <div className="d-flex flex-wrap gap-2 mt-2">
                <span>Choose platforms : </span>{platforms.map((platform, index) => (
                    <div key={index} className="form-check me-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value={platform}
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() => handleTogglePlatform(platform)}
                            id={`platform-${index}`}
                        />
                        <label className="form-check-label" htmlFor={`platform-${index}`}>
                            {platform}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformsSelection;
