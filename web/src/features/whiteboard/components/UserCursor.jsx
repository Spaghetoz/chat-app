
import { Circle } from "react-konva";

export default function UserCursor({name, pos}) {

    return(
        <>
            <Circle key={name} x={pos.x} y={pos.y} radius={5} fill="red" />
        </>
    )
}