'use client';

import { useRef, useState } from 'react';
import { FabricImage, FabricText } from "fabric";
import { Download, Trash2 } from 'lucide-react';
import CanvasComponent from './CanvasComponent';
import ImageUploader from './ImageUploader';
import Gallery from './Gallery';

export default function MemeEditor() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    const FIXED_CANVAS_WIDTH = 600; // Keep width fixed

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file || !canvas) return;
    
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.height / img.width;
                const newHeight = FIXED_CANVAS_WIDTH * aspectRatio;
    
                canvas.setWidth(FIXED_CANVAS_WIDTH);
                canvas.setHeight(newHeight);
                canvas.clear();
    
                const fabricImg = new FabricImage(img, {
                    left: 0,
                    top: 0,
                    selectable: false,
                });
                fabricImg.scaleToWidth(FIXED_CANVAS_WIDTH);
    
                canvas.backgroundImage = fabricImg;
                canvas.renderAll();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    
    const addImageToCanvas = (imageSrc) => {
        if (!canvas) return;
    
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const maxWidth = canvas.width * 0.5;
            const maxHeight = canvas.height * 0.5;
    
            let scaleX = maxWidth / img.width;
            let scaleY = maxHeight / img.height;
            let scale = Math.min(scaleX, scaleY, 1);
    
            const fabricImg = new FabricImage(img, {
                left: canvas.width / 2 - (img.width * scale) / 2,
                top: canvas.height / 2 - (img.height * scale) / 2,
                scaleX: scale,
                scaleY: scale,
                selectable: true,
            });
    
            canvas.add(fabricImg);
            canvas.setActiveObject(fabricImg);
            canvas.renderAll();
        };
        img.src = imageSrc;
    };
    
    const addTextToCanvas = (text, color, fontFamily="Arial") => {
        if (!canvas) return;
        const fabricText = new FabricText(text, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: 40,
            fill: color,
            fontFamily: fontFamily,
            selectable: true,
        });
        canvas.add(fabricText);
        canvas.setActiveObject(fabricText);
        canvas.renderAll();
    };

    const clearCanvas = () => {
        if (!canvas) return;
        canvas.getObjects().forEach((obj) => {
            if (obj !== canvas.backgroundImage) {
                canvas.remove(obj);
            }
        });
        canvas.renderAll();
    };

    const downloadMeme = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({ format: 'png' });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'meme.png';
        link.click();
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h1 className="text-3xl font-bold text-white mb-4 flex items-center space-x-2">
                <img src="https://www.tabichain.com/images/new/tabi-logo.png" alt="Tabi Icon" className="w-full h-12" />
                <span className='font-[Goofy] '>MemeForge</span>
                <img src="/images/stickers/anger_logo.png" alt="Anger Icon" className="w-10 h-10" />
            </h1>
            
            {/* Controls (Upload, Download, Clear) */}
            <div className="flex space-x-4 mb-6">
                <ImageUploader handleImageUpload={handleImageUpload} />
                <button onClick={downloadMeme} className="bg-white text-[#C92D2E] border-2 border-black p-2 px-4 text-lg rounded-full hover:bg-[#C92D2E] hover:text-white mb-6 flex items-center space-x-2"> 
                    <Download size={20} />
                    <span>Download</span>
                </button>
                <button onClick={clearCanvas} className="bg-white text-[#C92D2E] border-2 border-black p-2 px-4 text-lg rounded-full hover:bg-[#C92D2E] hover:text-white mb-6 flex items-center space-x-2">
                    <Trash2 size={20} />
                    <span>Clear</span>
                </button>
            </div>
            
            {/* Main Layout */}
            <div className="flex w-full max-w-9xl gap-6">
                {/* Left Section: Gallery */}
                <div className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg h-[80vh] overflow-y-auto">
                    <Gallery addImageToCanvas={addImageToCanvas} addTextToCanvas={addTextToCanvas} />
                </div>

                {/* Right Section: Canvas */}
                <div className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-lg flex justify-center items-center">
                    <CanvasComponent canvasRef={canvasRef} setCanvas={setCanvas} />
                </div>
            </div>
        </div>
    );
}
