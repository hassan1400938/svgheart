import React from 'react';

const RightSidebar = ({ selectedObject, onUpdateText }) => {
  if (!selectedObject || selectedObject.type !== 'text') {
    return null;
  }

  const handleInputChange = (property, value) => {
    selectedObject.set(property, value);
    selectedObject.canvas.renderAll();
    onUpdateText();
  };

  return (
    <aside className="bg-gray-100 w-48 p-4 absolute top-0 right-0 h-full overflow-y-auto">
      <h2 className="font-bold mb-2">Text Options</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Text</label>
        <input
          type="text"
          value={selectedObject.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Color</label>
        <input
          type="color"
          value={selectedObject.fill}
          onChange={(e) => handleInputChange('fill', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <input
          type="number"
          value={selectedObject.fontSize}
          onChange={(e) => handleInputChange('fontSize', parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Font Family</label>
        <input
          type="text"
          value={selectedObject.fontFamily}
          onChange={(e) => handleInputChange('fontFamily', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bold</label>
        <input
          type="checkbox"
          checked={selectedObject.fontWeight === 'bold'}
          onChange={(e) => handleInputChange('fontWeight', e.target.checked ? 'bold' : 'normal')}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Italic</label>
        <input
          type="checkbox"
          checked={selectedObject.fontStyle === 'italic'}
          onChange={(e) => handleInputChange('fontStyle', e.target.checked ? 'italic' : 'normal')}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Underline</label>
        <input
          type="checkbox"
          checked={selectedObject.underline}
          onChange={(e) => handleInputChange('underline', e.target.checked)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Overline</label>
        <input
          type="checkbox"
          checked={selectedObject.overline}
          onChange={(e) => handleInputChange('overline', e.target.checked)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Linethrough</label>
        <input
          type="checkbox"
          checked={selectedObject.linethrough}
          onChange={(e) => handleInputChange('linethrough', e.target.checked)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Text Align</label>
        <select
          value={selectedObject.textAlign}
          onChange={(e) => handleInputChange('textAlign', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
    </aside>
  );
};

export default RightSidebar;
