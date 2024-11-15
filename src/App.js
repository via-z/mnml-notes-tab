import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [rectangles, setRectangles] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const addRectangle = () => {
    setRectangles([
      ...rectangles,
      { id: Date.now(), x: 100, y: 100, text: "" },
    ]);
  };

  const handleDragStart = (e, id) => {
    setDraggedItem({ id, offsetX: e.clientX, offsetY: e.clientY });
  };

  const handleDrag = (e) => {
    if (!draggedItem) return;
    const { id, offsetX, offsetY } = draggedItem;

    setRectangles((rects) =>
      rects.map((rect) =>
        rect.id === id
          ? {
              ...rect,
              x: rect.x + (e.clientX - offsetX),
              y: rect.y + (e.clientY - offsetY),
            }
          : rect
      )
    );
    setDraggedItem({ ...draggedItem, offsetX: e.clientX, offsetY: e.clientY });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleTextChange = (id, text) => {
    setRectangles((rects) =>
      rects.map((rect) => (rect.id === id ? { ...rect, text } : rect))
    );
  };

  return (
    <div className="app" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
      <button className="add-button" onClick={addRectangle}>
        +
      </button>
      {rectangles.map((rect) => (
        <div
          key={rect.id}
          className="rectangle"
          style={{
            left: `${rect.x}px`,
            top: `${rect.y}px`,
          }}
          onMouseDown={(e) => handleDragStart(e, rect.id)}
        >
          <textarea
            className="rectangle-text"
            value={rect.text}
            onChange={(e) => handleTextChange(rect.id, e.target.value)}
            placeholder="Type here..."
          />
        </div>
      ))}
    </div>
  );
};

export default App;
