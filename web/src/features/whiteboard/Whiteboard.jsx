import { useState,} from "react";
import { Stage, Layer } from "react-konva";

import { useSocketDrawing } from "./hooks/useSocketDrawing";
import { useDrawing } from "./hooks/useDrawing";

import ToolBar from "./components/ToolBar";
import UserCursor from "./components/UserCursor";
import BoardItem from "./components/BoardItem";


export default function Whiteboard() {
  const [boardContent, setBoardContent] = useState([]);
  const [selectedMode, setSelectedMode] = useState("line")

  const [usersPos, setUsersPos] = useState({});
  const [boardSize, setBoardSize] = useState({ width: 800, height: 600 });

  const { socket, positionRef } = useSocketDrawing(boardContent, setBoardContent, setUsersPos, setBoardSize);
  const drawing = useDrawing(selectedMode, boardContent, setBoardContent, socket, positionRef);

  return (

    <div 
      style={{width: boardSize.width, height: boardSize.height }}
      className="flex shadow-lg relative"
    >

      <Stage
        width={boardSize.width}
        height={boardSize.height}
        onMouseDown={drawing.handleMouseDown}
        onMousemove={drawing.handleMouseMove}
        onMouseup={drawing.handleMouseUp}
        onMouseLeave={drawing.handleMouseLeave}
        onTouchStart={drawing.handleMouseDown}
        onTouchMove={drawing.handleMouseMove}
        onTouchEnd={drawing.handleMouseUp}
        onClick={drawing.handleMouseClick}
        style={{
          background: "white",
          width: boardSize.width,
          height: boardSize.height,
        }}
      >
        <Layer>
          {boardContent.map((item, i) => (
            <BoardItem item={item} key={i}></BoardItem>
          ))}

          {Object.entries(usersPos).map(([id, pos]) => (
            <UserCursor key={id} name={id} pos={pos}></UserCursor>
          ))}
        </Layer>
      </Stage>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-xl flex bg-white shadow-xl">
          <ToolBar
            color={drawing.color}
            setColor={drawing.setColor}
            strokeWidth={drawing.strokeWidth}
            setStrokeWidth={drawing.setStrokeWidth}
            eraser={drawing.eraser}
            setEraser={drawing.setEraser}
            handleClear={drawing.handleClear}
            setSelectedMode={setSelectedMode}
          />
        </div>
    </div>
  );
}