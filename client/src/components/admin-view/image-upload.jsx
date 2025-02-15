import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add("border-[#8b6b45]", "bg-[#fff9f0]");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("border-[#8b6b45]", "bg-[#fff9f0]");
  }

  function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("border-[#8b6b45]", "bg-[#fff9f0]");
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-6 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-3 block text-gray-800">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          ${isEditMode ? "opacity-60 cursor-not-allowed" : ""}
          border-2 border-dashed border-[#b2966c] 
          rounded-lg p-6 transition-all duration-200 
          hover:border-[#8b6b45] hover:bg-[#fff9f0]
          shadow-sm
        `}
      >
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`
              ${isEditMode ? "cursor-not-allowed" : "cursor-pointer"}
              flex flex-col items-center justify-center 
              min-h-[160px] space-y-3
              text-gray-600 hover:text-gray-800
            `}
          >
            <UploadCloudIcon className="w-12 h-12 text-[#b2966c] transition-transform duration-200 group-hover:scale-110" />
            <div className="text-center space-y-2">
              <span className="font-medium block">
                Drag & drop your image here
              </span>
              <span className="text-sm text-gray-500">
                or click to browse files
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Supported formats: JPG, PNG, GIF
            </div>
          </Label>
        ) : imageLoadingState ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full bg-gray-100 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-gray-100 rounded-md" />
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
            <div className="flex items-center flex-1 min-w-0">
  {imageFile && (
    <>
      {/* ✅ Define `fileUrl` outside JSX */}
      {(() => {
        const fileUrl = URL.createObjectURL(imageFile);
        return imageFile.type.startsWith("image/") ? (
          <img src={fileUrl} alt={imageFile.name} className="w-12 h-12 object-cover rounded-md" />
        ) : (
          <FileIcon className="w-12 h-12 text-[#b2966c] flex-shrink-0" />
        );
      })()}
      {/* ✅ Display file name correctly */}
      <p className="ml-3 text-sm font-medium text-gray-700 truncate">
        {imageFile.name}
      </p>
    </>
  )}
</div>

            <Button
              variant="ghost"
              size="sm"
              className="ml-4 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
      {!imageLoadingState && imageFile && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          File ready for upload
        </p>
      )}
    </div>
  );
}

export default ProductImageUpload;