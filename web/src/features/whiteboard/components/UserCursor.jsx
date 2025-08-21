
import { Path } from "react-konva";

export default function UserCursor({name, pos}) {

    const cursorOffset = 8;

    return(
        <>
            <Path
                key={name}
                data="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
                stroke="#3b97adff"
                strokeWidth={2.5}
                fill="white"
                x={pos.x-cursorOffset}
                y={pos.y-cursorOffset}
                scale={{ x: 2, y: 2 }} 
            />
        </>
    )
}