

export default function ToolBar( 
    {color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    eraser,
    setEraser,
    handleClear} ) {
    
    return(

        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <input
                type="range"
                min="1"
                max="50"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
            />
            <label>
                <input
                    type="checkbox"
                    checked={eraser}
                    onChange={(e) => setEraser(e.target.checked)}
                />{" "}
                Gomme
            </label>
            <button onClick={handleClear}>Effacer tout</button>
        </div>
    )
}