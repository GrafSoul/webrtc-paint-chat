import React, { useState } from 'react';

const CopyLink = ({ url }) => {
    const [copied, setCopied] = useState(false);

    function handleCopyLink(url) {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            })
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    }

    return (
        <div className="copy" onClick={() => handleCopyLink(url)}>
            {copied && <span className="copied">Copied!</span>}
            <img src="images/icon_copy.svg" alt="" />
        </div>
    );
};

export default CopyLink;
