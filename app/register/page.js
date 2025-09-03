"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input handler
  const handleChange = (field, value) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!registerData.name.trim()) newErrors.name = "Name is required";

    if (!registerData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = "Invalid email format";

    if (!registerData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Registration successful:", data.message);
        router.push("/login"); // redirect to login page after successful registration
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Create an Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register to get started
          </Typography>
        </Box>

        {/* Error Alert */}
        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.general}
          </Alert>
        )}

        {/* Register Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={registerData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            value={registerData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={registerData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, height: 48 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </Box>

        {/* Login Link */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login here
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
