// Function to crop the image to 1024x800
export const cropImage = (imageFile) => {
  // Set the crop dimensions
  const CROP_WIDTH = 1024;
  const CROP_HEIGHT = 800;

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to the crop dimensions
      canvas.width = CROP_WIDTH;
      canvas.height = CROP_HEIGHT;

      // Calculate the cropping area (central portion of the image)
      const offsetX = (img.width - CROP_WIDTH) / 2;
      const offsetY = (img.height - CROP_HEIGHT) / 2;

      // Draw the cropped image on the canvas
      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        CROP_WIDTH,
        CROP_HEIGHT, // Source image area (cropping)
        0,
        0,
        CROP_WIDTH,
        CROP_HEIGHT // Destination canvas area (final size)
      );

      // Convert cropped area to base64
      const croppedImage = canvas.toDataURL("image/jpeg", 0.9); // Adjust quality if needed
      // setImage(croppedImage); // Set the cropped image
      return croppedImage;
    };
  };

  reader.readAsDataURL(imageFile);
};

export const compressImage = (imageFile, maxWidth = 1024, maxHeight = 800) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          } else {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
        resolve(compressedImage);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};
