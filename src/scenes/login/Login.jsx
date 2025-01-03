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

const Login = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post(
        "http://192.168.1.36:5000/login",
        formData
      );
      const { token, name, email } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials.");
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mb-4"
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
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          </Card>

          <Box mt="20px" textAlign="center">
            <Typography>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: theme.palette.secondary.main }}
              >
                Signup here
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
