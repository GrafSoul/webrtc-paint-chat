import React, { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CopyLink from '../components/CopyLink';
import QRCodeImage from '../components/QRCodeImage';
import Loader from '../components/Loader';

const CreateChat = ({ history }) => {
    const [spinner, setSpinner] = useState(false);

    const browser = navigator.userAgent.toLowerCase();
    const is_IE =
        /trident/gi.test(browser) ||
        /msie/gi.test(browser) ||
        /edge/gi.test(browser);

    useEffect(() => {
        setTimeout(() => setSpinner(true), 1000);
    }, []);

    const id = uuid();
    const url = window.location.href + `chat/${id}`;

    const createRoom = () => {
        history.push(`/chat/${id}`);
        return false;
    };

    return (
        <>
            <Header />
            <div className="container">
                <main>
                    {is_IE ? (
                        <section className="create-chat">
                            <div className="crete-info">
                                <h2>
                                    You are using a browser that does not
                                    support the technologies used in this
                                    service
                                </h2>

                                <p>
                                    <strong>PAINT.OK</strong> - Chat to draw
                                    together.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <section className="create-chat">
                            <div className="crete-info">
                                <p>
                                    <strong>PAINT.OK</strong> - Chat to draw
                                    together.
                                </p>
                                <p>
                                    To create a connection, click on the button
                                    - <strong>"Create a New Connection"</strong>{' '}
                                    and send the link to the person with whom
                                    you want to communicate.
                                </p>
                            </div>

                            <div className="link-url">
                                <CopyLink url={url} />
                                <p>{url}</p>
                            </div>

                            <div className="qrcode">
                                <QRCodeImage url={url} />
                            </div>

                            <div className="btn-go">
                                <button onClick={() => createRoom()}>
                                    Create a New Connection
                                </button>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            <Footer />

            {!spinner && (
                <div className="loader">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default CreateChat;
