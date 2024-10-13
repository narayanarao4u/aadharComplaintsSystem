import React, { useState } from "react";
import styled from "styled-components";
import api from "../api";
import { useNavigate } from "react-router-dom";

const ComplaintForm = ({ onNewComplaint }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const frmData = new FormData(e.target);
    // console.log(Object.fromEntries(frmData.entries()))

    const data = Object.fromEntries(frmData.entries());
    data.image = image;
    console.log(data);


    try {
      const response = await api.post("api/complaints", data);
      navigate("/complaintList"); // Redirect to the complaint list page
    } catch (err) {
      console.error("Error creating complaint:", err);
    }
  };

  // Set the max width/height for the image
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 800;

  // Handle paste event to capture and compress the image
  const handlePaste = (event) => {
    event.preventDefault();
    const items = event.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        compressImage(blob); // Compress the pasted image
        // cropImage(blob); // Crop the pasted image
      }
    }
  };

  // Set the crop dimensions
  const CROP_WIDTH = 1024;
  const CROP_HEIGHT = 800;
  // Function to crop the image to 1024x800
  const cropImage = (imageFile) => {
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
        setImage(croppedImage); // Set the cropped image
      };
    };

    reader.readAsDataURL(imageFile);
  };

  // Function to compress the image
  const compressImage = (imageFile) => {
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
        setImage(compressedImage); // Set the compressed image
      };
    };

    reader.readAsDataURL(imageFile);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // setImage(URL.createObjectURL(file));
      compressImage(file);
    }
  };
  return (
    <Form onSubmit={handleSubmit} onPaste={handlePaste}>
      <section>
        <label htmlFor="stationId">Station ID</label>
        <input type="text" name="stationId" id="stationId"
          defaultValue={data["stationId"]} placeholder="Enter station ID" />

        <CustomInput disp="Station Name" name="name" defval={data["stattionName"]}
          placeholder="Enter station name"
        />

        <CustomInput disp="Operator Name" name="name" defval={data["name"]} />

        <CustomInput disp="Phone Number" name="phone" defval={data["phone"]} />
        <label htmlFor="complaint">Complaint Discription</label>
        <textarea
          name="complaint"
          id="complaint"
          defaultValue={data["complaint"]}
          required
          rows={4}
        />
        
      </section>

      <div >
      {/* File input to upload image */}
      <div className="file-input">
      <label htmlFor="stationId">Upload Error Image</label>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>
        

        <div style={{ border: "1px dashed gray", padding: "10px", marginBottom: "10px" }}>
          <p>Error image can be uploaded or Paste image here (Ctrl+V)</p>
          {image && (
            <img src={image} alt="pasted" style={{ maxWidth: "200px", maxHeight: "200px" }} />
          )}
        </div>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) 1fr;
  gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }

  div.file-input {
     display: flex;
     justify-content: space-evenly;
     margin-bottom: 10px;
  }
`;

export function CustomInput({ disp, name, type = "text", defval = null }) {
  return (
    <>
      <label htmlFor={name}>{disp} :</label>
      <input type={type} name={name} id={name} defaultValue={defval} required />
    </>
  );
}

export default ComplaintForm;
