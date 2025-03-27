'use client';

import { useEffect } from 'react';
import { Canvas } from "fabric";

const CanvasComponent = ({ canvasRef, setCanvas }) => {
    useEffect(() => {
        const fabricCanvas = new Canvas(canvasRef.current, {
            backgroundColor: '#fff',
            width: 600,
            height: 400,
            preserveObjectStacking: true,
            selection: true,
        });
        setCanvas(fabricCanvas);
        return () => fabricCanvas.dispose();
    }, [setCanvas]);

    return <canvas ref={canvasRef}></canvas>;
};

export default CanvasComponent;
