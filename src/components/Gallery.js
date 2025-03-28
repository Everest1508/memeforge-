import { useState } from "react";

const Gallery = ({ addImageToCanvas, addTextToCanvas }) => {
    const [activeTab, setActiveTab] = useState("Tabi");
    const [customText, setCustomText] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [fontFamily, setFontFamily] = useState("Arial");

    const images = {
        Tabi: [
            "/images/stickers/anger_logo.png",
            "/images/stickers/1736336059915.png",
            "/images/stickers/1736336067180.png",
            "/images/stickers/1736336069993.png",
            "/images/stickers/1736336072866.png",
            "/images/stickers/1736336077469.png",
            "/images/stickers/1736336080130.png",
            "/images/stickers/1736336083253.png",
            "/images/stickers/1736336187278.png",
            "/images/stickers/1737960628964.png",
            "/images/stickers/1737960633438.png",
            "/images/stickers/1737960634964.png",
            "/images/stickers/1737962277836.png",
            "/images/stickers/1737962383060.png",
            "/images/stickers/1737971355761.png",
            "/images/stickers/1738746064829.png",
            "/images/stickers/1738910091869.png",
            "/images/stickers/1738910094543.png",
            "/images/stickers/1738910097241.png",
            "/images/stickers/1738910099524.png",
            "/images/stickers/1738910101230.png",
            "/images/stickers/1738910103832.png",
            "/images/stickers/1738910105909.png",
            "/images/stickers/1738910108653.png",
            "/images/stickers/1738910110869.png",
            "/images/stickers/1738910917595.png",
            "/images/stickers/20250225-111909.png",
            "/images/stickers/20250225-111917.png",
            "/images/stickers/20250225-111948.png",
            "/images/stickers/tabi_kol_video_bg.png",
            "/images/stickers/shiro_sing.png",
            "/images/stickers/shiro_flower.png",
        ],
        Text: [],
    };

    const fonts = ["Arial", "Times New Roman"];

    return (
        <div className="w-full h-full flex flex-col bg-white rounded-3xl shadow-lg">
            {/* Tabs */}
            <div className="flex justify-center space-x-4 p-4 border-b border-gray-300">
                {Object.keys(images).map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full text-lg font-bold transition ${
                            activeTab === category
                                ? "bg-[#C92D2E] text-white shadow-md transform scale-105"
                                : "bg-white text-[#C92D2E] border-2 border-[#C92D2E]"
                        }`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Container (Fixed Height with Scrollable Content) */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Tabi Images */}
                {activeTab === "Tabi" && images["Tabi"]?.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                        {images["Tabi"].map((img, index) => (
                            <div
                                key={index}
                                className="p-2 bg-white rounded-2xl shadow-lg hover:scale-110 transition transform duration-200 border-2 border-[#C92D2E] flex justify-center items-center cursor-pointer"
                                onClick={() => addImageToCanvas(img)}
                            >
                                <img
                                    src={img}
                                    alt="Gallery Item"
                                    className="w-32 h-32 object-contain rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Text Tab (Custom Text Input) */}
                {activeTab === "Text" && (
                    <div className="text-center p-4">
                        <input
                            type="text"
                            placeholder="Enter text..."
                            className="border-2 border-gray-400 rounded-lg px-4 py-2 w-full mb-3"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                        />

                        <div className="flex items-center justify-center space-x-4 mb-3">
                            {/* Color Picker */}
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-12 h-12 cursor-pointer"
                            />

                            {/* Font Selector */}
                            <select
                                value={fontFamily}
                                onChange={(e) => setFontFamily(e.target.value)}
                                className="border-2 border-gray-400 px-4 py-2 rounded-lg"
                            >
                                {fonts.map((font) => (
                                    <option key={font} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="bg-[#C92D2E] text-white px-6 py-2 rounded-lg font-bold"
                            onClick={() => {
                                if (customText.trim() !== "") {
                                    addTextToCanvas(customText, textColor, fontFamily);
                                    setCustomText("");
                                }
                            }}
                        >
                            Add Text
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
