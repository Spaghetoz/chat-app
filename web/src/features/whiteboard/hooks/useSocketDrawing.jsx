import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/whiteboard");

export function useSocketDrawing(boardContent, setBoardContent, setUsersPos, setBoardSize) {
  const positionRef = useRef({ x: 0, y: 0 });

  const _loadBoard = (boardContent) => {
      for(let item of boardContent) {
        _drawItem(item)
      } 
  }

  const _drawItem = (item) => {
    setBoardContent((prev) => [...prev, item])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("updateUserPos", positionRef.current);
    }, 10);

    socket.emit("init")

    socket.on("init", ({ boardContent, userPositions, boardSize }) => {

      _loadBoard(boardContent)

      setUsersPos(userPositions);
      setBoardSize(boardSize);
    });

    socket.on("updateUserPos", ({ userId, pos }) => {
      setUsersPos((prev) => ({ ...prev, [userId]: pos }));
    });
    
    socket.on("clearBoard", () => {
      setBoardContent([])
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
  }, []);

  return { socket, positionRef };
}