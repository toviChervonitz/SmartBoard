import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  Container,
  Avatar,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: any) => Promise<void>;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const validateForm = () => {
    if (mode === "register") {
      if (!formData.name || formData.name.length < 2) {
        setError("שם חייב להכיל לפחות 2 תווים");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("הסיסמאות אינן תואמות");
        return false;
      }
    }
    if (!formData.email || !formData.email.includes("@")) {
      setError("אנא הזן כתובת אימייל תקינה");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("סיסמה חייבת להכיל לפחות 6 תווים");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      // אם ההרשמה/התחברות הצליחה, ננווט לדף הבית
      navigate("/");
    } catch (err: any) {
      setError(err.message || "אירעה שגיאה. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: 56,
            height: 56,
          }}
        >
          <PersonIcon fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {mode === "login" ? "התחברות" : "הרשמה"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {mode === "register" && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="שם מלא"
              name="name"
              autoComplete="name"
              autoFocus={mode === "register"}
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="אימייל"
            name="email"
            autoComplete="email"
            autoFocus={mode === "login"}
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {mode === "register" && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="אימות סיסמה"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              height: 48,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
            }}
          >
            {mode === "login" ? "התחברות" : "הרשמה"}
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              color="primary"
              onClick={() =>
                navigate(mode === "login" ? "/register" : "/login")
              }
              sx={{ textTransform: "none" }}
            >
              {mode === "login"
                ? "עדיין אין לך חשבון? הירשם עכשיו"
                : "כבר יש לך חשבון? התחבר"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
