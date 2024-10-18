import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuSendHorizonal } from "react-icons/lu";
import api from "../api";
import ComplaintHisTable from "./ComplaintHisTable";

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 800;

const ComplaintForm = ({ onNewComplaint }) => {
  const [formData, setFormData] = useState({
    stationId: "",
    stationName: "",
    Operatorname: "",
    phone: "",
    complaint: "",
  });
  const [image, setImage] = useState(null);
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

  const compressImage = useCallback((imageFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height *= MAX_WIDTH / width));
            width = MAX_WIDTH;
          } else {
            width = Math.round((width *= MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
        setImage(compressedImage);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData(e.target);
    formDataToSubmit.append("image", image);

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

  const handlePaste = useCallback(
    (event) => {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          compressImage(items[i].getAsFile());
          break;
        }
      }
    },
    [compressImage]
  );

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) compressImage(file);
    },
    [compressImage]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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
            required
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

        <div>
          <div className="file-input">
            <label htmlFor="imageUpload">Upload Error Image</label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
          <ImagePreview>
            <p>Error image can be uploaded or Paste image here (Ctrl+V)</p>
            {image && <img src={image} alt="pasted" />}
          </ImagePreview>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Submit <LuSendHorizonal className="ml-2" />
          </button>
        </div>
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
  align-items: center;
  justify-content: space-evenly;

  section {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 10px;
    margin-bottom: 10px;
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
