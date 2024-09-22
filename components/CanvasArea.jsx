import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

import mockupsData from "../utils/mockups.json";

const CanvasArea = forwardRef(
  ({ mockupCategory, imageToAdd, onTextObjectSelected }, ref) => {
    const fabricCanvasRef = useRef(null);
    const fabricCanvasInstance = useRef(null);
    const [mockupConfig, setMockupConfig] = useState(null);

    const canvasSize = { width: 616, height: 464 };

    useImperativeHandle(ref, () => ({
      addText(type) {
        const text = new fabric.Text(
          type === "heading"
            ? "Heading"
            : type === "subheading"
            ? "Subheading"
            : "Body Text",
          {
            left: 50,
            top: 50,
            fontSize: type === "heading" ? 32 : type === "subheading" ? 24 : 16,
            fontWeight: type === "heading" ? "bold" : "normal",
          }
        );
        fabricCanvasInstance.current.add(text).setActiveObject(text);
        fabricCanvasInstance.current.renderAll();
      },
    }));

    useEffect(() => {
      if (!fabricCanvasInstance.current) {
        const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current, {
          width: canvasSize.width,
          height: canvasSize.height,
        });
        fabricCanvasInstance.current = fabricCanvas;

        fabricCanvas.on("selection:created", (e) => {
          const selectedObject = e.target;
          if (selectedObject && selectedObject.type === "text") {
            onTextObjectSelected(selectedObject);
          }
        });

        fabricCanvas.on("selection:updated", (e) => {
          const selectedObject = e.target;
          if (selectedObject && selectedObject.type === "text") {
            onTextObjectSelected(selectedObject);
          }
        });
      }

      const selectedMockup = mockupsData[mockupCategory]?.find(
        (item) =>
          item.mockup === (imageToAdd != null ? imageToAdd : "shirt1.png")
      );
      setMockupConfig(selectedMockup);
    }, [mockupCategory, onTextObjectSelected]);

    useEffect(() => {
      if (mockupConfig) {
        const imgElement = new Image();

        imgElement.src = `/images/${mockupConfig.mockup}`;
        imgElement.onload = () => {
          const imgInstance = new fabric.Image(imgElement, {
            left: 0,
            top: 0,
            scaleX: fabricCanvasInstance.current.width / imgElement.width,
            scaleY: fabricCanvasInstance.current.height / imgElement.height,
            selectable: false,
          });
          fabricCanvasInstance.current.backgroundImage = imgInstance;
          fabricCanvasInstance.current.renderAll();

          // Clear existing dummy SVGs
          fabricCanvasInstance.current.getObjects().forEach((obj) => {
            if (obj !== fabricCanvasInstance.current.backgroundImage) {
              fabricCanvasInstance.current.remove(obj);
            }
          });

          // Add the dummy SVG with realistic effects
          fetch("/images/girls-on-fire.svg")
            .then((response) => response.text())
            .then((svgText) => {
              fabric.loadSVGFromString(svgText, (objects, options) => {
                const svgGroup = fabric.util.groupSVGElements(objects, options);
                svgGroup.set({
                  left: mockupConfig.left,
                  top: mockupConfig.top,
                  scaleX: 200 / options.width, // Adjust scale as needed
                  scaleY: 200 / options.height, // Adjust scale as needed
                  evented: false,
                });
                fabricCanvasInstance.current.add(svgGroup);
                fabricCanvasInstance.current.renderAll();
              });
            })
            .catch((error) => console.error("Error loading SVG:", error));
        };
      }
    }, [mockupConfig]);

    useEffect(() => {
      if (imageToAdd) {
        const imgElement = new Image();
        imgElement.src = `/images/${imageToAdd}`;
        imgElement.onload = () => {
          const imgInstance = new fabric.Image(imgElement, {
            left: 0,
            top: 0,
            scaleX: fabricCanvasInstance.current.width / imgElement.width,
            scaleY: fabricCanvasInstance.current.height / imgElement.height,
            selectable: false,
          });
          fabricCanvasInstance.current.backgroundImage = imgInstance;
          fabricCanvasInstance.current.renderAll();
        };
      }
    }, [imageToAdd]);

    return (
      <div className="relative shadow-md">
        <canvas ref={fabricCanvasRef} />
      </div>
    );
  }
);

export default CanvasArea;
