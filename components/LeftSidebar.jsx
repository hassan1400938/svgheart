import { MdTextFields } from "react-icons/md";
import { LuGrid } from "react-icons/lu";
import React, { useState } from "react";
import { FaShapes } from "react-icons/fa";
import Image from "next/image";

const mockupCategories = [
  {
    name: "Shirts",
    images: [
      "shirt1.png",
      "shirt2.png",
      "shirt3.png",
      "shirt4.png",
      "shirt5.png",
    ],
  },
  { name: "Cups", images: ["cup1.png", "cup2.png"] },
  { name: "Frames", images: ["frame1.png", "frame2.png"] },
  { name: "Pillows", images: ["pillow1.png", "pillow2.png"] },
];

const shapeCategories = [
  { name: "Basic", shapes: ["square", "circle", "triangle"] },
  { name: "Rounded", shapes: ["rounded-square", "rounded-circle"] },
  { name: "Outlined", shapes: ["outlined-square", "outlined-circle"] },
];

const LeftSidebar = ({ onSelectMockup, onAddText }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMockup, setExpandedMockup] = useState(null);
  const [expandedShape, setExpandedShape] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleAccordion = (accordion, type) => {
    if (type === "mockup") {
      setExpandedMockup(expandedMockup === accordion ? null : accordion);
    } else if (type === "shape") {
      setExpandedShape(expandedShape === accordion ? null : accordion);
    }
  };

  return (
    <aside className="bg-gray-200 w-20 flex flex-col gap-2 items-center py-4">
      <button
        className={`top_icon_button p-2 text-center hover:bg-white ${
          activeMenu === "mockup" ? "bg-white text-pink-500" : ""
        }`}
        onClick={() => toggleMenu("mockup")}
      >
        <LuGrid
          size={24}
          className={`${activeMenu === "mockup" ? "text-pink-500" : ""}`}
        />
        <span className="text-xs">Mockup</span>
      </button>
      <button
        className={`top_icon_button p-2 text-center hover:bg-white ${
          activeMenu === "text" ? "bg-white text-pink-500" : ""
        }`}
        onClick={() => toggleMenu("text")}
      >
        <MdTextFields
          size={24}
          className={`${activeMenu === "text" ? "text-pink-500" : ""}`}
        />
        <span className="text-xs">Text</span>
      </button>
      <button
        className={`top_icon_button p-2 text-center hover:bg-white ${
          activeMenu === "shapes" ? "bg-white text-pink-500" : ""
        }`}
        onClick={() => toggleMenu("shapes")}
      >
        <FaShapes
          size={24}
          className={`${activeMenu === "shapes" ? "text-pink-500" : ""}`}
        />
        <span className="text-xs">Shapes</span>
      </button>

      {activeMenu && (
        <aside className="bg-gray-100 w-48 p-4 absolute top-0 left-20 h-full overflow-y-auto">
          {activeMenu === "mockup" && (
            <div>
              <h2 className="font-bold mb-2">Mockup</h2>
              <input
                type="text"
                placeholder="Search mockups"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              {mockupCategories.map((category) => (
                <div key={category.name}>
                  <button
                    className={`w-full text-left font-bold py-2 hover:text-pink-500 ${
                      expandedMockup === category.name ? "text-pink-500" : ""
                    }`}
                    onClick={() => toggleAccordion(category.name, "mockup")}
                  >
                    {category.name}
                  </button>
                  {expandedMockup === category.name && (
                    <div className="overflow-x-auto mb-4">
                      <div className="flex space-x-2">
                        {category.images.map((image, index) => (
                          <Image
                            key={index}
                            src={`/images/${image}`}
                            alt={category.name}
                            height={96}
                            width={96}
                            className="h-24 cursor-pointer"
                            onClick={() => onSelectMockup(image)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeMenu === "text" && (
            <div>
              <h2 className="font-bold mb-2">Text</h2>
              <button
                className="bg-gray-300 w-full p-2 mb-2 rounded"
                onClick={() => onAddText("heading")}
              >
                Add Heading
              </button>
              <button
                className="bg-gray-300 w-full p-2 mb-2 rounded"
                onClick={() => onAddText("subheading")}
              >
                Add Subheading
              </button>
              <button
                className="bg-gray-300 w-full p-2 mb-2 rounded"
                onClick={() => onAddText("body")}
              >
                Add Body Text
              </button>
            </div>
          )}
          {activeMenu === "shapes" && (
            <div>
              <h2 className="font-bold mb-2">Shapes</h2>
              <input
                type="text"
                placeholder="Search shapes"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              {shapeCategories.map((category) => (
                <div key={category.name}>
                  <button
                    className={`w-full text-left font-bold py-2 hover:text-pink-500 ${
                      expandedShape === category.name ? "text-pink-500" : ""
                    }`}
                    onClick={() => toggleAccordion(category.name, "shape")}
                  >
                    {category.name}
                  </button>
                  {expandedShape === category.name && (
                    <div className="overflow-x-auto mb-4">
                      <div className="flex space-x-2">
                        {category.shapes.map((shape, index) => (
                          <div
                            key={index}
                            className="h-24 w-24 bg-gray-300 cursor-pointer flex items-center justify-center"
                          >
                            {shape}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </aside>
      )}
    </aside>
  );
};

export default LeftSidebar;
