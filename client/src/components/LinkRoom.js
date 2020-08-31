import React from 'react';

import QRCodeImage from './QRCodeImage';

const LinkRoom = ({
    shareLink,
    handleShareLink,
    handleCopyLink,
    copied,
    url,
}) => {
    return (
        <div className={['link', shareLink ? 'active' : null].join(' ')}>
            <button
                className="btn-close"
                onClick={handleShareLink}
                title="Close"
            >
                <span className="icon icon-close"></span>
            </button>

            <h2>Contact link</h2>
            <p className="link-info">
                Copy the link and send it to the person you want to meet in a
                video chat
            </p>
            <p className="link-url">
                <input type="text" value={url} onChange={() => {}} />
            </p>

            <div className="link-copy">
                <button onClick={() => handleCopyLink(url)}>Copy link</button>{' '}
                {copied && <span className="copyed">Copied!</span>}
            </div>

            <p className="link-info">
                Use as an option. Scan QRCode and send the resulting link to the
                person with who want to start communicating in video chat
            </p>
            <div className="link-qrcode">
                <QRCodeImage url={url} />
            </div>
        </div>
    );
};

export default LinkRoom;
