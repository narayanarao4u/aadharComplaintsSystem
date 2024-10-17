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

// Function to compress the image
export const compressImage = (imageFile) => {
  // Set the max width/height for the image
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 800;
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions based on max width/height
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height *= MAX_WIDTH / width));
          width = MAX_WIDTH;
        } else {
          width = Math.round((width *= MAX_HEIGHT / height));
          height = MAX_HEIGHT;
        }
      }

      // Set canvas dimensions to the new dimensions
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress and convert the image to base64
      const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality (0.7)
      //setImage(compressedImage); // Set the compressed image
      
    };
  };

  reader.readAsDataURL(imageFile);
};
