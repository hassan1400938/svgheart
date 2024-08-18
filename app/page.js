"use client";
import CanvasArea from "@/components/CanvasArea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import React, { useState, useRef } from "react";
import Head from "next/head";

export default function Home() {
  // const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageToAdd, setImageToAdd] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [mockupCategory, setMockupCategory] = useState('shirts'); // Default category is 'shirts'
  const canvasRef = useRef(null);

  const handleMockupSelection = (image) => {
    // console.log(image)
    // setBackgroundImage(image);
    setImageToAdd(image);
  };

  const handleTextObjectSelected = (object) => {
    setSelectedObject(object);
  };

  const handleTextUpdate = () => {
    if (selectedObject && selectedObject.canvas) {
      selectedObject.canvas.renderAll();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>SVG Editor & Mockup Generator</title>
      </Head>
      <Header />

      <div className="flex flex-1 relative">
        <LeftSidebar onSelectMockup={handleMockupSelection} onAddText={(type) => canvasRef.current.addText(type)} />

        <main className="flex-1 flex flex-col items-center justify-center">
          <CanvasArea ref={canvasRef} mockupCategory={mockupCategory} imageToAdd={imageToAdd} />
        </main>

        <RightSidebar selectedObject={selectedObject} onUpdateText={handleTextUpdate} />
      </div>

      <Footer />
    </div>
  );
}
