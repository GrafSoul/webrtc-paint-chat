import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import adapter from 'webrtc-adapter';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ExitButton from '../components/ExitButton';
import Loader from '../components/Loader';
import PaintPlayer from '../components/PaintPlayer';
import Settings from '../components/Settings';

const Chat = ({ match, history }) => {
    const [constraints, setConstraints] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [open, setSOpen] = useState(false);

    const id = match.params.id;

    useEffect(() => {
        setTimeout(() => setSpinner(true), 1000);
    });

    const exitRoom = () => {
        history.push('/');
    };

    const startChat = (param) => {
        setConstraints(param);
        setSOpen(true);
    };

    return (
        <>
            <Header />

            <ExitButton exitRoom={exitRoom} />

            {!open && <Settings startChat={startChat} />}

            {open && (
                <PaintPlayer
                    id={id}
                    history={history}
                    constraints={constraints}
                />
            )}

            {!spinner && (
                <div className="loader">
                    <Loader />
                </div>
            )}

            <Footer />
        </>
    );
};

export default Chat;
