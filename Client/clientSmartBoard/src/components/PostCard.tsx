import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import type { PostCardProps } from "../models/Post";
import LikeButton from './LikeButton';

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

        <LikeButton post={post}></LikeButton>
      </CardContent>
    </Card>
  );
}
