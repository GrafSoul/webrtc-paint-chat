import React, { useRef, useEffect, useState } from 'react';

const DrawBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth / 1.5}px`;
        canvas.style.height = `${window.innerHeight / 1.5}px`;
        widthRef.current = window.innerWidth / 1.5;
        heightRef.current = window.innerHeight / 1.5;

        const context = canvas.getContext('2d');
        context.scale(3, 3);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const setClear = () => {
        contextRef.current.clearRect(0, 0, widthRef.current, heightRef.current);
    };

    return (
        <div className="draw-board">
            <canvas
                className="canvas-draw"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
            <div className="draw-settings">
                <button onClick={setClear}>Clear</button>
                <div className="draw-color"></div>
            </div>
        </div>
    );
};

export default DrawBoard;
