const ImageUploader = ({ handleImageUpload }) => (
  <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mb-6 p-2 text-lg border-2 border-black rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#C92D2E] file:text-white hover:file:bg-red-600"
  />
);

export default ImageUploader;
