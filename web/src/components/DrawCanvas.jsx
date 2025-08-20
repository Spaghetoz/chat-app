import React, { useRef, useState , useEffect} from 'react';
import { Stage, Layer, Line } from 'react-konva';


import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function DrawingCanvas() {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraser, setEraser] = useState(false);

    const stageRef = useRef();

    const [linesToSend, setLinesToSend] = useState([]);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLinesToSend([
            ...linesToSend,
            {
                points: [pos.x, pos.y],
                color: eraser ? 'white' : color,
                strokeWidth,
                eraser
            }
        ])
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const lastLine = linesToSend[linesToSend.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        const newLines = lines.slice(0, lines.length - 1).concat(lastLine);
        setLinesToSend(newLines);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        
        sendLines()
    };

    const handleClear = () => {
        setLines([]);
    };

    
    useEffect(() => {
       
        socket.on("draw", (lines) => {
            for(let line of lines) {
                setLines([
                    ...lines, line
                ]);
            }
        });

        return () => {
            socket.off("draw"); 
        };
    }, []);
    
    const sendLines = () => {
        socket.emit("draw", linesToSend)
        setLinesToSend([]);
    };

    return (
        <div style={{ userSelect: 'none' }}>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={eraser}
                        onChange={(e) => setEraser(e.target.checked)}
                    /> Gomme
                </label>
                <button onClick={handleClear}>Effacer tout</button>
            </div>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 50}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                style={{ background: '#f0f0f0' }}
                ref={stageRef}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.strokeWidth}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}
