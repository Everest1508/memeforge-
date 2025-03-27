const ImageUploader = ({ handleImageUpload }) => (
  <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mb-6 p-2 text-lg border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
  />
);

export default ImageUploader;
