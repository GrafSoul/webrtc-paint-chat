import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeImage = ({ url }) => {
    return (
        <QRCode
            value={url}
            bgColor={'#1d1d1d'}
            fgColor={'#bebebe'}
            size={200}
        />
    );
};

export default QRCodeImage;
