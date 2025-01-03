import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assests/Logo PNG/02.png";

const Signup = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setSuccessMessage(""); 

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await axios.post(`http://192.168.1.36:5000/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );
        setTimeout(() => navigate("/login"), 3000); 
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid style={{ width: "50%" }}>
          <Card
            className=""
            style={{
              background: "none",
              padding: "22px 45px 38px 39px",
              border: "none",
            }}
          >
            <Grid>
              <Typography variant="h2" gutterBottom>
                <img
                  src={logo}
                  style={{
                    width: "18%",
                    marginBOttom: "30px",
                    marginBottom: 0,
                  }}
                />
              </Typography>
            </Grid>
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
                  aria-label="Name input field"
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  name="name"
                  required
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  aria-label="Email input field"
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  name="email"
                  required
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  aria-label="Password input field"
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  name="password"
                  required
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              {errorMessage && (
                <Typography color="error" mt={2}>
                  {errorMessage}
                </Typography>
              )}
              {successMessage && (
                <Typography color="success" mt={2}>
                  {successMessage}
                </Typography>
              )}
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Signup
                </Button>
              </Box>
            </form>
          </Card>
          <Box mt="20px" textAlign="center">
            <Typography>
              Already have an account?{" "}
              <Link to="/login" style={{ color: theme.palette.secondary.main }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Signup;
