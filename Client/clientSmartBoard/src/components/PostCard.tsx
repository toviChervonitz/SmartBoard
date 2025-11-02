import { Card, CardContent, Typography, Button } from "@mui/material";
import type { PostCardProps } from "../models/Post";

export default function PostCard({ post, isLoggedIn }: PostCardProps) {
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

        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❤️ {post.likes || 0} לייקים
        </Typography>
      </CardContent>
    </Card>
  );
}
