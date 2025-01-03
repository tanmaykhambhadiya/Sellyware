// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   useTheme,
// } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios"; // Import Axios for backend communication
// import Header from "../../components/Header";

// const Form = () => {
//   const theme = useTheme();
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     ip: "",
//     channel: 1,
//     subtype: 0,
//     model: "", // Default model value
//   });
//   const [generatedUrl, setGeneratedUrl] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the RTSP data to Flask backend
//       const response = await axios.post(
//         "http://192.168.1.36:5000/url",
//         {
//           username: formData.username,
//           password: formData.password,
//           ip_address: formData.ip,
//           channel: formData.channel,
//           subtype: formData.subtype,
//           model: formData.model,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT if authentication is required
//           },
//         }
//       );

//       // Success response handling
//       if (response.status === 200) {
//         setGeneratedUrl(response.data.url);
//         alert("RTSP URL generated and sent to backend successfully!");
//       }
//     } catch (error) {
//       console.error("Error while connecting to the backend:", error);
//       alert("Failed to connect to the backend. Check the console for details.");
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header
//         title="CREATE RTSP URL"
//         subtitle="Generate an RTSP URL by providing the required details"
//       />

//       <form onSubmit={handleFormSubmit}>
//         <Box
//           display="grid"
//           gap="30px"
//           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//           sx={{
//             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="Username"
//             value={formData.username}
//             onChange={handleInputChange}
//             name="username"
//             required
//             sx={{ gridColumn: "span 2" }}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="password"
//             label="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             name="password"
//             required
//             sx={{ gridColumn: "span 2" }}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="IP Address"
//             value={formData.ip}
//             onChange={handleInputChange}
//             name="ip"
//             required
//             sx={{ gridColumn: "span 2" }}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="number"
//             label="Channel"
//             value={formData.channel}
//             onChange={handleInputChange}
//             name="channel"
//             min="1"
//             required
//             sx={{ gridColumn: "span 1" }}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="number"
//             label="Subtype"
//             value={formData.subtype}
//             onChange={handleInputChange}
//             name="subtype"
//             min="0"
//             required
//             sx={{ gridColumn: "span 1" }}
//           />

//           {/* Dropdown for Model Selection */}
//           <TextField
//             fullWidth
//             variant="filled"
//             select
//             label="Model"
//             value={formData.model}
//             onChange={handleInputChange}
//             name="model"
//             SelectProps={{
//               native: true,
//             }}
//             sx={{ gridColumn: "span 2" }}
//           >
//             <option value="yolo11n.pt">person count</option>
//             <option value="other_model.pt">Other Model</option>
//           </TextField>
//         </Box>
//         <Box display="flex" justifyContent="end" mt="20px">
//           <Button type="submit" color="secondary" variant="contained">
//             Generate RTSP URL
//           </Button>
//         </Box>
//       </form>

//       {generatedUrl && (
//         <Box mt={4}>
//           <h3>Generated RTSP URL:</h3>
//           <p>{generatedUrl}</p>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Form;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Card,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import logo from "../../assests/Logo PNG/02.png"

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    const fetchRTSPUrls = async () => {
      try {
        const response = await fetch("http://192.168.1.36:5000/rtsp", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.urls) {
          const urls = data.urls.map((url, index) => ({
            id: index + 1,
            personCount: url.model,
            url: url.camera_source,
          }));
          setRows(urls);
        } else {
          console.error("Failed to fetch RTSP URLs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching RTSP URLs:", error);
      }
    };

    fetchRTSPUrls();
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSearchQuery("");
    setSelectedOptions([]);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleToggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleRowSelection = (newSelection) => setSelectedRows(newSelection);

  const applySelectedOptions = () => {
    const updatedRows = rows.map((row) =>
      selectedRows.includes(row.id)
        ? { ...row, siteControl: selectedOptions.join(", ") }
        : row
    );
    setRows(updatedRows);
    setOpenDialog(false);
    setSearchQuery("");
    setSelectedOptions([]);
  };

  const handlePreviewClick = (rowData) => {
    setPreviewData(rowData);
    setPreviewDialogOpen(true);
  };

  const handlePreviewDialogClose = () => {
    setPreviewDialogOpen(false);
    setPreviewData(null);
  };

  const filterOptions = ["Option 1", "Option 2", "Option 3", "Option 4"]
    .filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((option) => ({
      label: option,
      selected: selectedOptions.includes(option),
    }));

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.grey[300]}>{params.row.url}</Typography>
      ),
    },
    {
      field: "Modal",
      headerName: "Modal",
      width: 150,
      renderCell: (params) => (
        <Typography color={colors.blueAccent[400]}>
          {params.row.personCount}
        </Typography>
      ),
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePreviewClick(params.row)}
        >
          Preview
        </Button>
      ),
    },
    {
      field: "close",
      headerName: "Close",
      width: 120,
      renderCell: () => (
        <Button variant="contained" color="secondary">
          Close
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing Site Data" />

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Open Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: "10px" }}
          onClick={applySelectedOptions}
        >
          Apply Selected
        </Button>
      </Box>

      <Box
        m="40px 20px 0 0"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            height: "20px",
          },
          "& .MuiDataGrid-row": {
            height: "px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          onSelectionModelChange={(newSelection) =>
            handleRowSelection(newSelection)
          }
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            label="Search Options"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: "10px" }}
          />
          <List>
            {filterOptions.map((option) => (
              <ListItem
                button
                key={option.label}
                onClick={() => handleToggleOption(option.label)}
              >
                <Checkbox checked={option.selected} />
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body2" color={colors.grey[500]} mt={2}>
            Selected Options: {selectedOptions.join(", ")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={applySelectedOptions} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={previewDialogOpen}
        onClose={handlePreviewDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          {previewData ? (
            <Box>
              <Typography variant="h4" className="mb-4" gutterBottom>
                Preview Details
              </Typography>
              <Card style={{ padding: "15px", border: "1px solid #020306" }}>
                <Typography>
                  <strong>URL:</strong>
                  <br /> <img src={logo} className="my-3" style={{width:"200px"}}/> 
                  {/* {previewData.url} */}
                </Typography>
                <Typography>
                  <strong>Person Count:</strong> {previewData.personCount}
                </Typography>
              </Card>
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions style={{paddingRight:"20px"}}>
          <Button

            onClick={handlePreviewDialogClose}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
