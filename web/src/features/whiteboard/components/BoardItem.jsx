import { Line, Circle, Rect } from "react-konva";

export default function BoardItem({item}) {
    switch (item.type) {
        case "line":
            return(
                <Line
                    points={item.points}
                    stroke={item.color}
                    strokeWidth={item.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
        case "shape-square":
            return (
                <Rect
                    x={item.points[0]}
                    y={item.points[1]}
                    width={40}
                    height={40}
                    fill={item.color}
                />
            );
        case "shape-circle":
            return (
                <Circle
                    x={item.points[0]}
                    y={item.points[1]}
                    radius={25}
                    fill={item.color}
                />
            );
        default:
            return null;
    }
}