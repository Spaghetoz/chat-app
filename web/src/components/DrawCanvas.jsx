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


    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([
            ...lines,
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
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        const newLines = lines.slice(0, lines.length - 1).concat(lastLine);
        setLines(newLines);
    };

    const handleMouseUp = () => {
        _endDrawing()
    };

    const handleMouseLeave = () => {
        _endDrawing()
    };

    const _endDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        sendLine()
    }

    const handleClear = () => {
        setLines([]);
    };

    
    useEffect(() => {

        socket.on("loadBoard", (boardContent) => {
            // TODO manage shape / images etc loading 
            for(let line of boardContent) {
                // TODO if(object is line)
                setLines(prev => [...prev, line]);
            }
        })
       
        socket.on("draw", (line) => {
            setLines(prev => [...prev, line]);
        });

        return () => {
            socket.off("draw"); 
        };
    }, []);
    
    const sendLine = () => {
        const lastLine = lines[lines.length - 1];
        socket.emit("draw", lastLine)
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
                onMouseLeave={handleMouseLeave}
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
