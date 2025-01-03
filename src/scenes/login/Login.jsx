import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending email and password to the backend for login
      const response = await axios.post("http://localhost:5000/login", formData);
      const { token, name, email } = response.data;

      // Save JWT token in localStorage
      localStorage.setItem("token", token);

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"  // Changed from username to email
            value={formData.email}
            onChange={handleInputChange}
            required
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        {errorMessage && (
          <Typography color="error" mt={2}>
            {errorMessage}
          </Typography>
        )}
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      <Box mt="20px" textAlign="center">
        <Typography>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: theme.palette.secondary.main }}>
            Signup here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
