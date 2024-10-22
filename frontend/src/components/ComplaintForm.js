import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuSendHorizonal } from "react-icons/lu";
import api from "../api";
import ComplaintHisTable from "./ComplaintHisTable";
import { compressImage } from "../context/utilities"
import AuthContext from "../context/AuthContext";

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 800;
const MAX_SIZE_KB = 100;

const ComplaintForm = ({ onNewComplaint }) => {
  const {state} = useContext(AuthContext);
  const { user } = state;

  
  const [formData, setFormData] = useState({
    stationId: user?.stationId || "", // Use optional chaining to avoid errors
    stationName: user?.stationName || "", // Handle undefined or null user properties
    Operatorname: "",
    phone: "",
    complaint: "",
  });

 
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [stations, setStations] = useState([]);
  const [complaintHistory, setComplaintHistory] = useState([]);

  const navigate = useNavigate();

  const fetchStations = useCallback(async () => {
    try {
      const response = await api.get("/api/complaints/stationData");
      setStations(response.data);
    } catch (err) {
      console.error("Error fetching stations:", err);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const getComplaintsbyStationID = useCallback(async (stationId) => {
    try {
      const response = await api.get(`/api/complaints/?stationId=${stationId}`);
      setComplaintHistory(response.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  }, []);

  useEffect(() => {
    const { stationId } = formData;
    if (stationId.length === 5) {
      const station = stations.find((s) => s.StationId === +stationId);
      if (station) {
        setFormData((prev) => ({ ...prev, stationName: station.AEK_LOCATION }));
        getComplaintsbyStationID(stationId);
      }
    } else {
      setFormData((prev) => ({ ...prev, stationName: "" }));
      setComplaintHistory([]);
    }
  }, [formData.stationId, stations, getComplaintsbyStationID]);

  const handleCompressImage = useCallback(async (imageFile) => {
    try {
      const { image: compressedImage, size } = await compressImage(imageFile, MAX_WIDTH, MAX_HEIGHT, MAX_SIZE_KB);
      setImage(compressedImage);
      setImageSize(size);
      
      if (size > MAX_SIZE_KB) {
        toast.warning(`Image size (${size.toFixed(2)}KB) exceeds ${MAX_SIZE_KB}KB limit. Please try a smaller image.`);
      }
    } catch (error) {
      console.error("Error compressing image:", error);
      toast.error("Failed to process the image. Please try again.");
    }
  }, []);

  const handlePaste = useCallback(
    (event) => {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          handleCompressImage(items[i].getAsFile());
          break;
        }
      }
    },
    [handleCompressImage]
  );

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) handleCompressImage(file);
    },
    [handleCompressImage]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = formData;    

    formDataToSubmit.image =  image;

    try {
      const response = await api.post("api/complaints", formDataToSubmit);
      if (response.status === 201) {
        toast.success("Complaint created successfully");
        navigate("/");
      } else {
        throw new Error("Failed to create complaint");
      }
    } catch (err) {
      console.error("Error creating complaint:", err);
      toast.error("Failed to create complaint");
    }
  };


  const isSubmitDisabled = useMemo(() => !formData.stationName, [formData.stationName]);
 

  return (
    <>
      <Form onSubmit={handleSubmit} onPaste={handlePaste}>
        <section>
          <CustomInput
            disp="Station ID"
            name="stationId"
            value={formData.stationId}
            onChange={handleChange}
            placeholder="Enter station ID"
            maxLength={5}
            minLength={5}
            readOnly = {user.role !== "admin"}
          />
          
          <CustomInput
            disp="Station Name"
            name="stationName"
            value={formData.stationName}
            onChange={handleChange}
            placeholder="Enter station name"
            readOnly
          />
          <CustomInput
            disp="Operator Name"
            name="Operatorname"
            value={formData.Operatorname}
            onChange={handleChange}
            placeholder="Enter operator name"
          />
          <CustomInput
            disp="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter operator Phone Number"
            maxLength={10}
            minLength={10}
          />
          <label htmlFor="complaint">Complaint Description</label>
          <textarea name="complaint" id="complaint" value={formData.complaint} onChange={handleChange} required rows={4} />
        </section>

        <aside>
          <div className="file-input">
            <label htmlFor="imageUpload">Upload Error Image</label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleFileUpload} />
            <small>Maximum image size: {MAX_SIZE_KB}KB</small>
          </div>
          <ImagePreview>
           
            <p>Error image can be uploaded or Paste image here (Ctrl+V)</p>
            <small>Maximum image size: {MAX_SIZE_KB}KB</small>
            {image && <img src={image} alt="pasted" />}
  
          </ImagePreview>
          <button
            type="submit"
            disabled={isSubmitDisabled || (imageSize && imageSize > MAX_SIZE_KB)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 "
          >
            Submit <LuSendHorizonal className="ml-2" />
          </button>
        </aside>
      </Form>

      <hr />
      <ComplaintHisTable data={complaintHistory} />
    </>
  );
};

const Form = styled.form`
  background-image: linear-gradient(135deg, #e2d1c3 20%, #fdfcfb 80%);
  border: 3px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: minmax(320px, 1fr) 1fr;
  gap: 10px;
  padding: 10px;
  
  justify-content: space-evenly;

  section {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }

  aside {
    align-items: start;
  }

  div.file-input {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
  }
`;

const ImagePreview = styled.div`
  border: 1px dashed gray;
  padding: 10px;
  margin-bottom: 10px;

  img {
    max-width: 200px;
    max-height: 200px;
  }
`;

const CustomInput = ({ disp, ...props }) => (
  <>
    <label htmlFor={props.name}>{disp} :</label>
    <input type="text" id={props.name} required {...props} />
  </>
);

export default ComplaintForm;
