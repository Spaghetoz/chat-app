import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export function useSocketDrawing(lines, setLines, shapes, setShapes, setUsersPos, setBoardSize) {
  const positionRef = useRef({ x: 0, y: 0 });

  const _loadBoard = (boardContent) => {
      for(let item of boardContent) {
        _drawItem(item)
      } 
  }

  const _drawItem = (item) => {
        switch(item.type) {
          case "line":
            setLines((prev) => [...prev, item]);
            break;
          case "shape-circle":
          case "shape-square":
            setShapes((prev) => [...prev, item])
            break; 
        }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("updateUserPos", positionRef.current);
    }, 10);

    socket.on("init", ({ boardContent, userPositions, boardSize }) => {

      _loadBoard(boardContent)

      setUsersPos(userPositions);
      setBoardSize(boardSize);
    });

    socket.on("updateUserPos", ({ userId, pos }) => {
      setUsersPos((prev) => ({ ...prev, [userId]: pos }));
    });
    
    socket.on("clearBoard", () => {
      setLines([]);
      setShapes([]);
    })

    socket.on("userDisconnection", ({ userId }) => {
      setUsersPos((prev) => {
        const newUsers = { ...prev };
        delete newUsers[userId];
        return newUsers;
      });
    });

    socket.on("draw", (item) => {
      _drawItem(item)
    });

    return () => {
      clearInterval(interval);
      socket.off("draw");
      socket.off("updateUserPos");
      socket.off("userDisconnection");
    };
  }, [setLines, setUsersPos, setBoardSize]);

  return { socket, positionRef };
}