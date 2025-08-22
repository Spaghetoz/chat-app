import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Slider } from "@/components/ui/slider"
import { Pencil, Circle, Square, Eraser, Trash2 } from "lucide-react"

export default function ToolBar({  
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    eraser,
    setEraser,
    handleClear,
    selectedMode,
    setSelectedMode,
} ) {
    
    return(
        <div className="flex items-center gap-3 mb-4 gap-2">

            {/* Color Picker */}
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border"
            />

            {/* Stroke Width */}
            <Slider
                value={[strokeWidth]}
                onValueChange={(val) => setStrokeWidth(val[0])}
                min={1}
                max={50}
                step={1}
                className="w-32"
            />

            {/* Modes */}
            <ToggleGroup
                type="single"
                value={selectedMode}
                onValueChange={(val) => val && setSelectedMode(val)} 
            >
                <ToggleGroupItem
                    value="line"
                    aria-label="Draw"
                    className="h-14 w-14" 
                >
                    <Pencil/> 
                </ToggleGroupItem>

                <ToggleGroupItem
                    value="shape-circle"
                    aria-label="Circle"
                    className="h-14 w-14"
                >
                    <Circle/>
                </ToggleGroupItem>

                <ToggleGroupItem
                    value="shape-square"
                    aria-label="Square"
                    className="h-14 w-14"
                >
                    <Square/>
                </ToggleGroupItem>

            </ToggleGroup>
            
            <Button
                variant={eraser ? "default" : "outline"}
                onClick={() => setEraser(!eraser)}
                size="icon"
                className="h-12 w-12"
            >
                <Eraser className="h-12 w-12" />
            </Button>

            <Button
                variant="destructive"
                onClick={handleClear}
                size="icon"
                className="h-12 w-12"
            >
                <Trash2 className="h-12 w-12" />
            </Button>
        </div>
    )
}