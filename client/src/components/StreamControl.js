import React from 'react';

const StreamControl = ({
    handleShareLink,
    handleShareChat,
    handleToggleMic,
    audio,
    handleToggleSound,
    sound,
}) => {
    return (
        <div className="stream-control">
            <div className="btn-link">
                <button
                    className="btn"
                    onClick={handleShareLink}
                    title="Open Link"
                >
                    <span className="icon icon-link"></span>
                </button>
            </div>

            <div className="btn-group">
                <button
                    className="btn"
                    onClick={handleToggleMic}
                    title="Microphone ON/OFF"
                >
                    <span
                        className={[
                            'icon',
                            'icon-mic',
                            audio ? null : 'off',
                        ].join(' ')}
                    ></span>
                </button>

                <button
                    className="btn"
                    onClick={handleToggleSound}
                    title="Sound ON/OFF"
                >
                    <span
                        className={[
                            'icon',
                            'icon-sound',
                            sound ? 'off' : null,
                        ].join(' ')}
                    ></span>
                </button>
            </div>

            <div className="btn-chat">
                <button
                    className="btn"
                    onClick={handleShareChat}
                    title="Open Link"
                >
                    <span className="icon icon-chat"></span>
                </button>
            </div>
        </div>
    );
};

export default StreamControl;
