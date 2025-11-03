import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import type { PostCardProps } from "../models/Post";
import { deletePost } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, isLoggedIn, fromPersonalArea, onDelete }: PostCardProps) {

  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm("האם את בטוחה שברצונך למחוק את המודעה?")) {
      try {
        await deletePost(post._id);
        alert("✅ המודעה נמחקה בהצלחה");
        onDelete?.(post._id);
      } catch (err) {
        console.error("❌ שגיאה במחיקת פוסט:", err);
        alert("שגיאה במחיקה. נסי שוב מאוחר יותר.");
      }
    }
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography color="text.secondary">{post.location}</Typography>
        <Typography sx={{ my: 1 }}>{post.content}</Typography>

        {isLoggedIn ? (
          <Typography variant="body2" color="text.secondary">
            📞 {post.contactInfo?.phone || "לא צויין"}
            <br />
            ✉️ {post.contactInfo?.email || "לא צויין"}
          </Typography>
        ) : (
          <Button variant="contained" href="/login">
            התחבר כדי ליצור קשר
          </Button>
        )}

        {fromPersonalArea && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary"
              onClick={() => navigate("/post/edit", { state: { post } })}>
              ערוך
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              מחק
            </Button>
          </Stack>
        )}

        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❤️ {post.likes || 0} לייקים
        </Typography>
      </CardContent>
    </Card>
  );
}