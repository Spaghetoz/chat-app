import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocketDrawing(boardContent, setBoardContent, setUsersPos, setBoardSize) {
  const socketRef = useRef()
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
    
    socketRef.current = io("http://localhost:4000/whiteboard", {
      auth: { token: window.__ACCESS_TOKEN__ },
    });

    const interval = setInterval(() => {
      socketRef.current?.emit("updateUserPos", positionRef.current);
    }, 10);

    socketRef.current?.emit("init")

    socketRef.current?.on("init", ({ boardContent, userPositions, boardSize }) => {

      _loadBoard(boardContent)

      setUsersPos(userPositions);
      setBoardSize(boardSize);
    });

    socketRef.current?.on("updateUserPos", ({ userId, pos }) => {
      setUsersPos((prev) => ({ ...prev, [userId]: pos }));
    });
    
    socketRef.current?.on("clearBoard", () => {
      setBoardContent([])
    })

    socketRef.current?.on("userDisconnection", ({ userId }) => {
      setUsersPos((prev) => {
        const newUsers = { ...prev };
        delete newUsers[userId];
        return newUsers;
      });
    });

    socketRef.current?.on("draw", (item) => {
      _drawItem(item)
    });

    return () => {
      clearInterval(interval);
      socketRef.current?.off("draw");
      socketRef.current?.off("updateUserPos");
      socketRef.current?.off("userDisconnection");
      socketRef.current?.disconnect()
    };
  }, []);

  return { socket: socketRef.current, positionRef };
}