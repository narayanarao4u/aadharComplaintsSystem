import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ComplaintForm = ({ onNewComplaint }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({});

  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await api.get("/api/complaints/stationData");
        setStations(response.data);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStations();
  },[])

  useEffect(() => {

    let stationID = data.stationId;
    if (!stationID) return;

        
    if (stationID.length === 5) {
      const station = stations.find((station) => station.StationId === +stationID);
      console.log(station);

      if (station) {
        setData({
          ...data,       
          stationName: station.AEK_LOCATION,        
        })  
      }
      
    } else {
      setData({
        ...data,
        stationName: "",
      });
    }

    
  }, [data.stationId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const frmData = new FormData(e.target);
    // console.log(Object.fromEntries(frmData.entries()))

    const fdata = Object.fromEntries(frmData.entries());
    fdata.image = image;
    console.log(fdata);

    try {
      const response = await api.post("api/complaints", fdata);
      if( response.status != 201) {
        console.log(response);
        
        throw new Error("Failed to create complaint");
      }

      toast.success("Complaint created successfully");
      navigate("/"); // Redirect to the complaint list page
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



  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} onPaste={handlePaste}>
      <section>
        <label htmlFor="stationId">Station ID</label>
        <input
          type="text"
          name="stationId"
          id="stationId"
          value={data["stationId"]}
          placeholder="Enter station ID" 
          maxlength={5}    minLength={5} 
          required   
          
          onChange={handleOnChange}
        />



        <CustomInput
          disp="Station Name"
          name="stationName"
          value={data["stationName"]}
          placeholder="Enter station name"
          handleOnChange={handleOnChange}
          readOnly={true}
        />

        <CustomInput disp="Operator Name" name="Operatorname" value={data["Operatorname"]} 
            handleOnChange={handleOnChange}
            placeholder="Enter operator name"
            />

        <CustomInput disp="Phone Number" name="phone" value={data["phone"]} 
          handleOnChange={handleOnChange}
          maxlength={"10"} minlength={"10"} 
          placeholder="Enter operator Phone Number"
        />

        <label htmlFor="complaint">Complaint Discription</label>
        <textarea
          name="complaint"
          id="complaint"
          value={data["complaint"]}
          required
          rows={4}
          onChange={handleOnChange}
          

        />
      </section>

      <div>
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
        <button type="submit" disabled={!data?.stationName}>Submit</button>
      </div>
    </Form>
     
     <hr/>
 

    </>
    
  );
};

const Form = styled.form`
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  border: 3px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

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

export function CustomInput({ disp, name,  type = "text", value, handleOnChange, ...rest }) {
  return (
    <>
      <label htmlFor={name}>{disp} :</label>
      <input type={type} name={name} id={name} value={value} required {...rest} onChange={handleOnChange}/>
    </>
  );
}

export default ComplaintForm;
