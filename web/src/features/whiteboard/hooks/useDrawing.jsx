import { useState } from "react";

export function useDrawing(selectedMode ,boardContent, setBoardContent, socket, positionRef) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraser, setEraser] = useState(false);

  /** modeHandlers centralizes handlers for each drawing mode (mouseDown, mouseMove, mouseUp, etc.). 
   * (strategy pattern ?)
  */
  const modeHandlers = {

    "line": {
      mouseDown: (e) => {
        setIsDrawing(true);
          const pos = e.target.getStage().getPointerPosition();

          setBoardContent([
            ...boardContent,
            {
              type: "line",
              points: [pos.x, pos.y],
              color: eraser ? "white" : color,
              strokeWidth,
              eraser,
            },
        ]);
      },
      mouseMove: (e) => {
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        positionRef.current = { x: point.x, y: point.y };

        if (isDrawing) {
          const lastLine = boardContent[boardContent.length - 1];
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          setBoardContent([...boardContent.slice(0, -1), lastLine]);
        }
      }
    },
    "shape-circle": {
      mouseClick: handleShapeClick,
    },
    "shape-square": {
      mouseClick: handleShapeClick,
    },
  }

  function handleShapeClick(e) {
    const pos = e.target.getStage().getPointerPosition();
    const shape = {
      type: selectedMode,
      points: [pos.x, pos.y],
      color: eraser ? "white" : color,
      strokeWidth,
      eraser,
    };
    setBoardContent((prev) => [...prev, shape]);
    sendLastBoardItem();
  }

  

  const handleMouseDown = (e) => {  
    // call the mouseDown handler if the current mode handler exists
    modeHandlers[selectedMode]?.mouseDown?.(e);
  }

  const handleMouseMove = (e) => {    
    modeHandlers[selectedMode]?.mouseMove?.(e);
  };

  const handleMouseClick = (e) => {
    modeHandlers[selectedMode]?.mouseClick?.(e);
  }

  const handleMouseUp = () => {
    endDrawing();
    modeHandlers[selectedMode]?.mouseUp?.(e);
  } 
  const handleMouseLeave = () => {
    endDrawing();
    modeHandlers[selectedMode]?.mouseLeave?.(e);
  }
  
  const handleClear = () => {
    socket.emit("clearBoard")
  };
  

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    sendLastBoardItem()
  };

  const sendLastBoardItem = () => {
    const lastItem = boardContent[boardContent.length - 1];
    socket.emit("draw", lastItem);
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
    handleMouseClick
  };
}