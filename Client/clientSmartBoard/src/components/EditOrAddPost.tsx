import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Alert,
    Snackbar,
    Grid as MuiGrid,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { updatePost, createPost } from "../services/api";
import type { Post } from "../models/Post";
import { getFromLocalStorage } from "../services/localstorage";

interface User {
    _id: string;
    name: string;
}

export default function EditOrAddPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = (location.state || {}) as { post?: Post };
    const user = getFromLocalStorage<User>('userLogin');
    const id = user?._id || '';

    const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });

    const isEditing = Boolean(post);

    const [formData, setFormData] = useState<Post>(
        post || {
            _id: "",
            title: "",
            content: "",
            location: "",
            category: "",
            contactInfo: { phone: "", email: "" },
            likes: 0,
            userId: id
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "phone" || name === "email") {
            setFormData((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, [name]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updatePost(formData._id, formData);
                setSnackbar({
                    open: true,
                    message: "✅ המודעה עודכנה בהצלחה!",
                    severity: 'success'
                });
            } else {
                await createPost(formData);
                setSnackbar({
                    open: true,
                    message: "✅ המודעה נוספה בהצלחה!",
                    severity: 'success'
                });
            }
            setTimeout(() => navigate("/my-posts"), 1500);
        } catch (err) {
            console.error("❌ שגיאה:", err);
            setSnackbar({
                open: true,
                message: "אירעה שגיאה במהלך השמירה. נסה שוב.",
                severity: 'error'
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{ color: 'text.secondary' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1">
                        {isEditing ? "עריכת מודעה" : "יצירת מודעה חדשה"}
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12}>
                            <TextField
                                label="כותרת"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    sx: { fontSize: '1.1rem' }
                                }}
                            />
                        </Grid>

                        <MuiGrid item xs={12}>
                            <TextField
                                label="תוכן המודעה"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                                rows={4}
                                variant="outlined"
                                helperText="תאר את המודעה בצורה ברורה ומפורטת"
                            />
                        </MuiGrid>

                        <MuiGrid item xs={12}>
                            <TextField
                                label="מיקום"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiGrid>

                        <MuiGrid item xs={12} sm={6}>
                            <TextField
                                label="טלפון"
                                name="phone"
                                value={formData.contactInfo?.phone || ""}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiGrid>

                        <MuiGrid item xs={12} sm={6}>
                            <TextField
                                label="אימייל"
                                name="email"
                                type="email"
                                value={formData.contactInfo?.email || ""}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiGrid>

                        <MuiGrid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    sx={{ flex: { xs: 1, sm: 'none' } }}
                                >
                                    {isEditing ? "שמור שינויים" : "פרסם מודעה"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate(-1)}
                                    sx={{ flex: { xs: 1, sm: 'none' } }}
                                >
                                    ביטול
                                </Button>
                            </Box>
                        </MuiGrid>
                    </MuiGrid>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
