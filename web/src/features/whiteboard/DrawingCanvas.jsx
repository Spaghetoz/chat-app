import { useState,} from "react";
import { Stage, Layer, Line, Circle } from "react-konva";

import { useSocketDrawing } from "./hooks/useSocketDrawing";
import { useDrawing } from "./hooks/useDrawing";
import ToolBar from "./components/ToolBar";
import UserCursor from "./components/UserCursor";


export default function DrawingCanvas() {
  const [lines, setLines] = useState([]);
  const [usersPos, setUsersPos] = useState({});
  const [boardSize, setBoardSize] = useState({ width: 800, height: 600 });

  const { socket, positionRef } = useSocketDrawing(
    setLines,
    setUsersPos,
    setBoardSize
  );

  const {
    isDrawing,
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    eraser,
    setEraser,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleClear,
  } = useDrawing(lines, setLines, socket, positionRef);

  return (
    <div style={{ userSelect: "none" }}>
      
      <ToolBar
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        eraser={eraser}
        setEraser={setEraser}
        handleClear={handleClear}
      />

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
          background: "#f0f0f0",
          width: boardSize.width,
          height: boardSize.height,
        }}
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
              <UserCursor 
                name={id}
                pos={pos}
              ></UserCursor>
             ))}
        </Layer>
      </Stage>
    </div>
  );
}