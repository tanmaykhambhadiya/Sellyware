import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios"; // Import Axios for backend communication
import Header from "../../components/Header";

const Form = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    ip: "",
    channel: 1,
    subtype: 0,
    model: "", // Default model value
  });
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the RTSP data to Flask backend
      const response = await axios.post(
        "http://127.0.0.1:5000/url",
        {
          username: formData.username,
          password: formData.password,
          ip_address: formData.ip,
          channel: formData.channel,
          subtype: formData.subtype,
          model: formData.model,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT if authentication is required
          },
        }
      );

      // Success response handling
      if (response.status === 200) {
        setGeneratedUrl(response.data.url);
        alert("RTSP URL generated and sent to backend successfully!");
      }
    } catch (error) {
      console.error("Error while connecting to the backend:", error);
      alert("Failed to connect to the backend. Check the console for details.");
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE RTSP URL"
        subtitle="Generate an RTSP URL by providing the required details"
      />

      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            name="username"
            required
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            required
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="IP Address"
            value={formData.ip}
            onChange={handleInputChange}
            name="ip"
            required
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Channel"
            value={formData.channel}
            onChange={handleInputChange}
            name="channel"
            min="1"
            required
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Subtype"
            value={formData.subtype}
            onChange={handleInputChange}
            name="subtype"
            min="0"
            required
            sx={{ gridColumn: "span 1" }}
          />

          {/* Dropdown for Model Selection */}
          <TextField
            fullWidth
            variant="filled"
            select
            label="Model"
            value={formData.model}
            onChange={handleInputChange}
            name="model"
            SelectProps={{
              native: true,
            }}
            sx={{ gridColumn: "span 2" }}
          >
            <option value="yolo11n.pt">person count</option>
            <option value="other_model.pt">Other Model</option>
          </TextField>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Generate RTSP URL
          </Button>
        </Box>
      </form>

      {generatedUrl && (
        <Box mt={4}>
          <h3>Generated RTSP URL:</h3>
          <p>{generatedUrl}</p>
        </Box>
      )}
    </Box>
  );
};

export default Form;
