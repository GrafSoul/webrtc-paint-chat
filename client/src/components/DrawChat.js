import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect('/');

const DrawChat = () => {
    const canvasContainRef = useRef(null);
    const canvasRef = useRef(null);

    const [drawing, setDrawing] = useState(false);
    const [context, setContext] = useState(null);

    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [prevX, setPrevX] = useState(null);
    const [prevY, setPrevY] = useState(null);

    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [size, setSize] = useState(1);

    const [color, setColor] = useState('black');

    useEffect(() => {});

    useEffect(() => {
        let width = canvasContainRef.current.offsetWidth;
        let height = canvasContainRef.current.offsetHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        setContext(canvasRef.current.getContext('2d'));

        setWidth(width);
        setHeight(height);

        socket.on('get canvas', (board) => {
            for (let i = 0; i < board.length; i++) {
                drawLine(
                    context,
                    board[i].x1,
                    board[i].y1,
                    board[i].x2,
                    board[i].y2,
                    board[i].color,
                    board[i].size,
                );
            }
        });

        socket.on('draw', (data) => {
            drawLine(
                context,
                data.x1,
                data.y1,
                data.x2,
                data.y2,
                data.color,
                data.size,
            );
        });

        socket.on('erase board', (data) => {
            if (context) context.clearRect(0, 0, width, height);
        });
    }, [context]);

    const eraseBoard = () => {
        socket.emit('erase board');
        context.clearRect(0, 0, width, height);
    };

    const handleSizeChange = (e) => {
        const value = e.target.value;
        setSize(value);
    };

    const startDraw = (e) => {
        setDrawing(true);
        setPrevX(x);
        setPrevY(y);
    };

    const endDraw = (e) => {
        setDrawing(false);
    };

    const drawingPoint = (e) => {
        let rect = canvasRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        setX(x);
        setY(y);

        if (drawing) {
            drawLine(context, prevX, prevY, x, y, color, size);

            setPrevX(x);
            setPrevY(y);

            socket.emit('draw', {
                x1: prevX,
                y1: prevY,
                x2: x,
                y2: y,
                color: color,
                size: size,
            });
        }
    };

    const drawLine = (context, x1, y1, x2, y2, color, size) => {
        let newContext = context;
        if (newContext !== null) {
            newContext.strokeStyle = color;
            newContext.lineCap = 'round';
            newContext.beginPath();
            newContext.moveTo(x1, y1);
            newContext.lineTo(x2, y2);
            newContext.lineWidth = size;
            newContext.stroke();
            newContext.closePath();
            setContext(newContext);
        }
    };

    return (
        <div className="draw-container">
            <div className="canvas-row">
                <div className="tool-box">
                    <button onClick={eraseBoard}>Clean Board</button>
                    <div className="color-contain">
                        <div className="btn-contain">
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'white' }}
                                onClick={() => setColor('white')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'red' }}
                                onClick={() => setColor('red')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'green' }}
                                onClick={() => setColor('green')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'blue' }}
                                onClick={() => setColor('blue')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'yellow' }}
                                onClick={() => setColor('yellow')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'orange' }}
                                onClick={() => setColor('orange')}
                            />
                            <button
                                className="color-button"
                                style={{ backgroundColor: 'purple' }}
                                onClick={() => setColor('purple')}
                            />
                        </div>
                    </div>
                    <div className="size-contain">
                        <div className="size-value">{size}</div>
                        <input
                            className="brush-size"
                            name="size"
                            type="range"
                            min="1"
                            max="10"
                            value={size}
                            onChange={handleSizeChange}
                        />
                    </div>
                </div>
                <div className="canvas-contain" ref={canvasContainRef}>
                    <canvas
                        className="canvas"
                        ref={canvasRef}
                        onMouseDown={startDraw}
                        onMouseUp={endDraw}
                        onMouseMove={drawingPoint}
                        onMouseOut={endDraw}
                    />
                </div>
            </div>
        </div>
    );
};

export default DrawChat;
