// src/components/CanvasArea.jsx
import React, { useEffect, useState, useRef, forwardRef } from "react";
import * as THREE from "three";
import mockupsData from "../utils/mockups.json";

const CanvasArea = forwardRef(({ mockupCategory, imageToAdd }, ref) => {
  const canvasSize = { width: 616, height: 464 };
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const [mockupConfig, setMockupConfig] = useState(null);

  useEffect(() => {
    const selectedMockup = mockupsData[mockupCategory]?.find(
      (item) => item.mockup === (imageToAdd != null ? imageToAdd : "shirt1.png")
    );
    setMockupConfig(selectedMockup);
  }, [mockupCategory]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSize.width / canvasSize.height,
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasSize.width, canvasSize.height);
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const bgImage = imageToAdd ? `/images/${imageToAdd}` : "/images/shirt1.png";
    textureLoader.load(
      bgImage,
      (texture) => {
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );

    // Append the SVG only once
    if (!svgRef.current) {
      const svg = document.createElement("img");
      svg.src = "/images/dummy.svg";
      svg.style.position = "absolute";
      svg.style.top = "150px";
      svg.style.left = "150px";
      svg.style.width = "200px";
      svg.style.height = "200px";
      svg.style.cursor = "move";
      svgRef.current = svg;
      canvasRef.current.appendChild(svg);

      // Handle dragging functionality
      let isDragging = false;
      let startX, startY;

      svg.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - svg.offsetLeft;
        startY = e.clientY - svg.offsetTop;
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          svg.style.left = `${e.clientX - startX}px`;
          svg.style.top = `${e.clientY - startY}px`;
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      while (canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
      svgRef.current = null; // Reset SVG ref on unmount
    };
  }, [imageToAdd]);

  return (
    <div
      ref={canvasRef}
      className="relative shadow-md"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      {/* Canvas and SVG will be appended here */}
    </div>
  );
});

export default CanvasArea;
