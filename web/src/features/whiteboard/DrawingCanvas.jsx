import { useState,} from "react";
import { Stage, Layer, Line, Circle, Rect } from "react-konva";

import { useSocketDrawing } from "./hooks/useSocketDrawing";
import { useDrawing } from "./hooks/useDrawing";
import ToolBar from "./components/ToolBar";
import UserCursor from "./components/UserCursor";


export default function DrawingCanvas() {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedMode, setSelectedMode] = useState("line")

  const [usersPos, setUsersPos] = useState({});
  const [boardSize, setBoardSize] = useState({ width: 800, height: 600 });

  const { socket, positionRef } = useSocketDrawing(
    lines,
    setLines,
    shapes,
    setShapes,
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
    handleMouseClick,
    handleClear,
  } = useDrawing(selectedMode, lines, setLines , shapes, setShapes, socket, positionRef);

  return (

    <div 
      style={{ position: "relative", width: boardSize.width, height: boardSize.height }}
      className="flex shadow-lg"
    >

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
        onClick={handleMouseClick}
        style={{
          background: "white",
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

          {shapes.map((shape, i) => {
            switch (shape.type) {
              case "shape-square":
                return (
                  <Rect
                    key={i}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    width={40}
                    height={40}
                    fill={shape.color}
                  />
                );
              case "shape-circle":
                return (
                  <Circle
                    key={i}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    radius={25}
                    fill={shape.color}
                  />
                );
              default:
                return null;
            }
          })}

          {Object.entries(usersPos).map(([id, pos]) => (
            <UserCursor 
              key={id}
              name={id}
              pos={pos}
            ></UserCursor>
          ))}
        </Layer>
      </Stage>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            padding: "8px 16px",
            borderRadius: "12px",
          }}
          className="flex bg-white shadow-xl inset-shadow-xs"
        >
          <ToolBar
            color={color}
            setColor={setColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            eraser={eraser}
            setEraser={setEraser}
            handleClear={handleClear}
            setSelectedMode={setSelectedMode}
          />
        </div>
    </div>
  );
}