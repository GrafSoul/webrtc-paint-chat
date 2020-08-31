import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateChat from './P2P_PaintAudioChat/CreateChat';
import Chat from './P2P_PaintAudioChat/Chat';

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={CreateChat} />
                    <Route path="/chat/:id" component={Chat} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
