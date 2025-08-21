import { useState } from "react";

export function useDrawing(lines, setLines, socket, positionRef) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraser, setEraser] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        color: eraser ? "white" : color,
        strokeWidth,
        eraser,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    positionRef.current = { x: point.x, y: point.y };

    if (isDrawing) {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines.slice(0, -1), lastLine]);
    }
  };

  const handleMouseUp = () => endDrawing();
  const handleMouseLeave = () => endDrawing();

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    sendLine();
  };

  const sendLine = () => {
    const lastLine = lines[lines.length - 1];
    socket.emit("draw", lastLine);
  };

  const handleClear = () => {
    setLines([]);
  };

  return {
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
  };
}