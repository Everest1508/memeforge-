const Controls = ({ addSticker, addRect, downloadImage }) => (
  <div className="flex gap-4">
      <button onClick={() => addSticker("😎")} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Cool Dude 😎
      </button>
      <button onClick={() => addSticker("🔥")} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Fire 🔥
      </button>
      <button onClick={() => addSticker("💪")} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Flex 💪
      </button>
      <button onClick={addRect} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Rectangle
      </button>
      <button onClick={downloadImage} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          Download Image
      </button>
  </div>
);

export default Controls;
