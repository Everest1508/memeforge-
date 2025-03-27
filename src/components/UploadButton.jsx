const UploadButton = ({ onUpload }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        onUpload(file);
      }
    };
  
    return (
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2" />
      </div>
    );
};
  
export default UploadButton;
  