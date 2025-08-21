import React, { useRef, useState , useEffect} from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';


import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function DrawingCanvas() {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraser, setEraser] = useState(false);

    const stageRef = useRef();
    const [boardSize, setBoardSize] = useState({})

    const positionRef = useRef({ x: 0, y: 0 });

    // stores the other users cursor position on the board
    const [usersPos, setUsersPos] = useState({});

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
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        // Saves the cursor position
        positionRef.current = { x: point.x, y: point.y };

        if (isDrawing) {
            const lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            setLines([...lines.slice(0, -1), lastLine]);
        }
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

        const interval = setInterval(() => {
            socket.emit("updateUserPos", positionRef.current);
        }, 10);

        socket.on("init", ({boardContent, userPositions, boardSize}) => {
            // TODO manage shape / images etc loading 
            for(let line of boardContent) {
                // TODO if(object is line)
                setLines(prev => [...prev, line]);
            }

            setUsersPos(userPositions);

            setBoardSize(boardSize);
        })

        socket.on("updateUserPos", ({ userId, pos }) => {
            setUsersPos(prev => ({ ...prev, [userId]: pos }));
        });

        socket.on("userDisconnection", ({ userId }) => {
            setUsersPos(prev => {
                const newUsers = { ...prev };
                delete newUsers[userId];
                return newUsers;
            });
        });
       
        socket.on("draw", (line) => {
            setLines(prev => [...prev, line]);
        });

        return () => {
            clearInterval(interval)
            socket.off("draw"); 
            socket.off("loadBoard");
            socket.off("loadUsersPos");
            socket.off("updateUserPos")
            socket.off("userDisconnection");
            
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
                width={boardSize.width}
                height={boardSize.height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                style={{
                    background: '#f0f0f0',
                    width: boardSize.width,
                    height: boardSize.height,
                }}
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
                    {Object.entries(usersPos).map(([id, pos]) => (
                        <Circle
                        key={id}
                        x={pos.x}
                        y={pos.y}
                        radius={5}
                        fill="red"
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}
