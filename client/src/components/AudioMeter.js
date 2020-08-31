import React, { useRef, useEffect } from 'react';

const AudioMeter = ({
    userStream,
    number,
    widthLine,
    lineClass,
    meterClass,
    heightLine,
    model,
}) => {
    const smallMeter = useRef();
    const meterItem = useRef(null);
    const myElements = useRef(null);
    const num = useRef(number);
    const width = useRef(widthLine);
    const heightLineBox = useRef(heightLine);
    const modelMeter = useRef(model);
    const line = useRef(lineClass);
    const array = useRef([]);

    useEffect(() => {
        let context, analyser;
        array.current = new Uint8Array(num.current * 2);

        if (context) return;

        for (let i = 0; i < num.current; i++) {
            meterItem.current = document.createElement('div');
            meterItem.current.className = line.current;
            meterItem.current.style.background = '#626262';
            meterItem.current.style.minWidth = width.current + 'px';
            meterItem.current.style.display = 'none';
            smallMeter.current.appendChild(meterItem.current);
        }

        context = new AudioContext();
        analyser = context.createAnalyser();

        try {
            if (userStream) {
                let src = context.createMediaStreamSource(userStream);
                src.connect(analyser);
            }
            loop();
        } catch (error) {
            alert(error + '\r\nRejected. The page will be updated!');
        }

        function loop() {
            myElements.current = document.getElementsByClassName(line.current);
            if (myElements.current.length > 0) {
                window.requestAnimationFrame(loop);
                analyser.getByteFrequencyData(array.current);
                for (var i = 0; i < num.current; i++) {
                    let height = array.current[i + num.current];
                    myElements.current[i].style.minHeight =
                        (modelMeter.current === 'small' ? height / 3 : height) +
                        'px';
                    myElements.current[i].style.opacity = 0.008 * height;
                    myElements.current[i].style.display = 'block';
                    if (
                        myElements.current[i].getBoundingClientRect().height >
                        heightLineBox.current
                    ) {
                        myElements.current[i].style.backgroundColor = '#c2c2c2';
                    } else {
                        myElements.current[i].style.backgroundColor = '#626262';
                    }
                }
            } else {
                return false;
            }
        }
    }, [userStream]);

    return <div className={meterClass} ref={smallMeter}></div>;
};

export default AudioMeter;
