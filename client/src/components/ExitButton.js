import React from 'react';

const ExitButton = ({ exitRoom }) => {
    return (
        <div className="btn-exit-wrap">
            <button className="btn-exit" onClick={exitRoom} title="Exit">
                <span className="icon icon-exit"></span>
            </button>
        </div>
    );
};

export default ExitButton;
