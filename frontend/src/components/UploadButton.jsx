import { useState } from "react";

const UploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    console.log("Uploading started");
    setIsUploading(true);
    setIsUploading(false);
  };

  return (
    <button onClick={handleUploadClick} disabled={isUploading}>
      {isUploading ? "Uploading..." : "Upload"}
    </button>
  );
};

export default UploadButton;
