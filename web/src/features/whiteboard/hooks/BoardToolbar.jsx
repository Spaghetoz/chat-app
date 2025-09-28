import { MousePointer, Pencil, Eraser, Shapes, Type, Undo, Redo, Circle, Square, Highlighter } from "lucide-react";

export default function BoardToolbar() {
  const tools = [
    { id: "select", icon: MousePointer },
    { id: "pen", icon: Pencil },
    { id: "highlighter", icon: Highlighter },
    { id: "eraser", icon: Eraser },
    { id: "shape-circle", icon: Circle },
    { id: "shape-square", icon: Square },
    { id: "shape", icon: Shapes },
    { id: "text", icon: Type },
    { id: "undo", icon: Undo },
    { id: "redo", icon: Redo },
  ];

  return (
    <div className="flex flex-row inline-flex flex-wrap rounded-lg gap-2 shadow-2xl bg-neutral-800 p-2 border border-neutral-700">
        {tools.map((t) => (
            <button
                key={t.id}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-neutral-700 active:bg-neutral-600"
            >
                <t.icon size={18} />
            </button>
        ))}
    </div>
  );
}
