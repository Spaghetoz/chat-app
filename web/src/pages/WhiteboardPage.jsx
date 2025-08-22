import DrawCanvas from "@/features/whiteboard/DrawingCanvas";

export default function WhiteboardPage() {

  return(
    <div className="flex justify-center align-center bg-gray-200 pt-10 w-screen h-screen">
      <DrawCanvas></DrawCanvas>
    </div>
  )
}