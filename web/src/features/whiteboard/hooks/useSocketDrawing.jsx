import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export function useSocketDrawing(setLines, setUsersPos, setBoardSize) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("updateUserPos", positionRef.current);
    }, 10);

    socket.on("init", ({ boardContent, userPositions, boardSize }) => {
      setLines(boardContent);
      setUsersPos(userPositions);
      setBoardSize(boardSize);
    });

    socket.on("updateUserPos", ({ userId, pos }) => {
      setUsersPos((prev) => ({ ...prev, [userId]: pos }));
    });

    socket.on("userDisconnection", ({ userId }) => {
      setUsersPos((prev) => {
        const newUsers = { ...prev };
        delete newUsers[userId];
        return newUsers;
      });
    });

    socket.on("draw", (line) => {
      setLines((prev) => [...prev, line]);
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