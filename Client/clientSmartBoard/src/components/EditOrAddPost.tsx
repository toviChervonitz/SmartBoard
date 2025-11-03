import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { updatePost, createPost } from "../services/api";
import type { Post } from "../models/Post";

export default function EditOrAddPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = (location.state || {}) as { post?: Post };
    const user = localStorage.getItem('userLogin');
    const id = user ? JSON.parse(user).id : '';
    console.log(user + "user");
    console.log(id + "id");



    // אם יש פוסט -> מצב עריכה, אחרת -> הוספה חדשה
    const isEditing = Boolean(post);

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({ ...prev, userId: id }));
        }
    }, [id]);

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
                alert("✅ הפוסט עודכן בהצלחה!");
            } else {
                const dataToSend = { ...formData };
                Reflect.deleteProperty(dataToSend, "_id");
                await createPost(dataToSend);
                alert("✅ הפוסט נוסף בהצלחה!");
            }
            navigate("/myPosts");
        } catch (err) {
            console.error("❌ שגיאה:", err);
            alert("אירעה שגיאה במהלך השמירה.");
        }
    };

    return (
        <Container sx={{ mt: 4, maxWidth: "600px" }}>
            <Typography variant="h4" gutterBottom>
                {isEditing ? "עדכון מודעה" : "הוספת מודעה חדשה"}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="כותרת"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="תוכן"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        required
                    />
                    <TextField
                        label="מיקום"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="טלפון"
                        name="phone"
                        value={formData.contactInfo?.phone || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="אימייל"
                        name="email"
                        value={formData.contactInfo?.email || ""}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary">
                        {isEditing ? "שמור שינויים" : "פרסם מודעה"}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
