'use client';

import { useRef, useState } from 'react';
import { FabricImage, FabricText, Rect } from "fabric";
import CanvasComponent from './CanvasComponent';
import ImageUploader from './ImageUploader';
import Controls from './Controls';

export default function MemeEditor() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file || !canvas) {
            console.log("No file or canvas not ready yet:", canvas);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const fabricImg = new FabricImage(img, {
                    left: 0,
                    top: 0,
                    selectable: false,
                });
                fabricImg.scaleToWidth(canvas.width);
                if (fabricImg.getScaledHeight() > canvas.height) {
                    fabricImg.scaleToHeight(canvas.height);
                }
                canvas.clear();
                canvas.setWidth(fabricImg.getScaledWidth());
                canvas.setHeight(fabricImg.getScaledHeight());
                canvas.backgroundImage = fabricImg;
                canvas.renderAll();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const downloadImage = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({ format: "png", quality: 1.0 });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "meme.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const addSticker = (emoji) => {
        if (!canvas) return;
        const sticker = new FabricText(emoji, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: 50,
            selectable: true,
            lockUniScaling: false,
        });
        canvas.add(sticker);
        canvas.setActiveObject(sticker);
        canvas.renderAll();
    };

    const addRect = () => {
        if (!canvas) return;
        const rect = new Rect({
            left: canvas.width / 2 - 50,
            top: canvas.height / 2 - 50,
            width: 100,
            height: 100,
            fill: "red",
            selectable: true,
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
        canvas.renderAll();
    };

    return (
        <div className="flex flex-col items-center min-h-screen  p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">MemeForge 💢</h1>
            <ImageUploader handleImageUpload={handleImageUpload} />
            <div className="border-2 border-dashed border-gray-600 mb-6">
                <CanvasComponent canvasRef={canvasRef} setCanvas={setCanvas} />
            </div>
            <Controls addSticker={addSticker} addRect={addRect} downloadImage={downloadImage} />
        </div>
    );
}
