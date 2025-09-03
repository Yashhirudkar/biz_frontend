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
import SchoolIcon from "@mui/icons-material/School";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Input handler
  const handleChange = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = "Invalid email format";

    if (!loginData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include", // important to include cookies
      });

      const data = await response.json();
localStorage.setItem("authToken",data.authToken)
      if (response.ok) {
        console.log("✅ Login successful, cookie should be set");
        router.push("/"); // redirect to your protected page
      } else {
        setErrors({ general: data.message || "Invalid credentials" });
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
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
            <SchoolIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        {/* Error Alert */}
        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.general}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            value={loginData.email}
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
            value={loginData.password}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </Box>

        {/* Register Link */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account? Register here
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
