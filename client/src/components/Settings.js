import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line
import adapter from 'webrtc-adapter';

import AudioInputMeter from './AudioInputMeter';

export default function Settings({ startChat }) {
    const audioElement = useRef();
    const audioInputSelect = useRef();
    const audioOutputSelect = useRef();
    const constraints = useRef();

    useEffect(() => {
        const selectors = [audioInputSelect.current, audioOutputSelect.current];
        audioOutputSelect.current.disabled = !(
            'sinkId' in HTMLMediaElement.prototype
        );

        function gotDevices(deviceInfos) {
            const values = selectors.map((select) => select.value);
            selectors.forEach((select) => {
                while (select.firstChild) {
                    select.removeChild(select.firstChild);
                }
            });

            for (let i = 0; i !== deviceInfos.length; ++i) {
                const deviceInfo = deviceInfos[i];
                const option = document.createElement('option');
                option.value = deviceInfo.deviceId;
                if (deviceInfo.kind === 'audioinput') {
                    option.text =
                        deviceInfo.label ||
                        `microphone ${audioInputSelect.current.length + 1}`;
                    audioInputSelect.current.appendChild(option);
                } else if (deviceInfo.kind === 'audiooutput') {
                    option.text =
                        deviceInfo.label ||
                        `speaker ${audioOutputSelect.current.length + 1}`;
                    audioOutputSelect.current.appendChild(option);
                } else {
                    console.log(
                        'Some other kind of source/device: ',
                        deviceInfo,
                    );
                }
            }

            selectors.forEach((select, selectorIndex) => {
                if (
                    Array.prototype.slice
                        .call(select.childNodes)
                        .some((n) => n.value === values[selectorIndex])
                ) {
                    select.value = values[selectorIndex];
                }
            });
        }

        navigator.mediaDevices
            .enumerateDevices()
            .then(gotDevices)
            .catch(handleError);

        function changeAudioDestination() {
            const audioDestination = audioOutputSelect.current.value;
            attachSinkId(audioElement.current, audioDestination);
        }

        function start() {
            const audioSource = audioInputSelect.current.value;

            constraints.current = {
                audio: {
                    deviceId: audioSource ? { exact: audioSource } : undefined,
                },
                video: false,
            };

            navigator.mediaDevices
                .getUserMedia(constraints.current)
                .then(gotStream)
                .then(gotDevices)
                .catch(handleError);
        }

        audioInputSelect.current.onchange = start;
        audioOutputSelect.current.onchange = changeAudioDestination;

        start();

        function handleError(error) {
            console.log(
                'navigator.MediaDevices.getUserMedia error: ',
                error.message,
                error.name,
            );
        }
    });

    function attachSinkId(element, sinkId) {
        if (typeof element.sinkId !== 'undefined') {
            element
                .setSinkId(sinkId)
                .then(() => {
                    console.log(
                        `Success, audio output device attached: ${sinkId}`,
                    );
                })
                .catch((error) => {
                    let errorMessage = error;
                    if (error.name === 'SecurityError') {
                        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
                    }
                    console.error(errorMessage);
                    // Jump back to first output device in the list as it's the default.
                    audioOutputSelect.current.selectedIndex = 0;
                });
        } else {
            console.warn('Browser does not support output device selection.');
        }
    }

    function gotStream(stream) {
        audioElement.current.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
    }

    return (
        <>
            <div className="container">
                <section className="create-chat settings">
                    <h2>Configure your audio devices</h2>

                    <div className="invisible">
                        <div className="audio-content">
                            <audio
                                id="audio"
                                autoPlay
                                playsInline
                                ref={audioElement}
                            ></audio>
                        </div>
                    </div>

                    <div className="select">
                        <label htmlFor="audioSource">Audio input:</label>
                        <AudioInputMeter />
                        <select
                            id="audioSource"
                            ref={audioInputSelect}
                        ></select>
                    </div>

                    <div className="select">
                        <label htmlFor="audioOutput">Audio output:</label>
                        <select
                            id="audioOutput"
                            ref={audioOutputSelect}
                        ></select>
                    </div>

                    <div className="crete-info">
                        <b>Note:</b> If you hear a reverb sound your microphone
                        is picking up the output of your speakers/headset, lower
                        the volume and/or move the microphone further away from
                        your speakers/headset.
                    </div>

                    <div className="btn-go">
                        <button onClick={() => startChat(constraints.current)}>
                            Start Chat
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}
