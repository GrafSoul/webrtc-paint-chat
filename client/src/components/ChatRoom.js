import React from 'react';
import ReactEmoji from 'react-emoji';
import Scrollbar from 'react-scrollbars-custom';

const ChatRoom = ({
    shareChat,
    handleShareChat,
    sendMessage,
    handleChange,
    message,
    yourID,
    messages,
}) => {
    return (
        <div className={['chat', shareChat ? 'active' : null].join(' ')}>
            <button
                className="btn-close"
                onClick={handleShareChat}
                title="Close"
            >
                <span className="icon icon-close"></span>
            </button>

            <h2>Chat</h2>

            <div className="chat-wrap">
                <Scrollbar className="chat-container">
                    {messages.map((message, index) => {
                        if (message.id === yourID) {
                            return (
                                <div key={index} className="in-row">
                                    <div className="in-message">
                                        {ReactEmoji.emojify(message.body)}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div key={index} className="out-row">
                                <div className="out-message">
                                    {ReactEmoji.emojify(message.body)}
                                </div>
                            </div>
                        );
                    })}
                </Scrollbar>
                <form className="chat-form" onSubmit={sendMessage}>
                    <textarea
                        autoFocus
                        value={message}
                        className="chat-write"
                        placeholder="Write text here..."
                        onChange={handleChange}
                        onKeyPress={(e) =>
                            e.key === 'Enter' ? sendMessage(e) : null
                        }
                    ></textarea>
                    <button className="chat-btn">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatRoom;
