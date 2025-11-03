import {
  Card, CardContent, Typography, Button, Stack,
  CardHeader, CardActions, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, Snackbar, Box, Divider
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import type { PostCardProps } from "../models/Post";
import LikeButton from './LikeButton';
import { deletePost } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function PostCard({ post, isLoggedIn, fromPersonalArea, onDelete }: PostCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      setSnackbar({
        open: true,
        message: "המודעה נמחקה בהצלחה",
        severity: 'success'
      });
      onDelete?.(post._id);
      setOpenDialog(false);
    } catch (err) {
      console.error("❌ שגיאה במחיקת פוסט:", err);
      setSnackbar({
        open: true,
        message: "שגיאה במחיקה. נסי שוב מאוחר יותר.",
        severity: 'error'
      });
import { deletePost } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, isLoggedIn, fromPersonalArea, onDelete }: PostCardProps) {

  const navigate = useNavigate();
//jhfvcbdxnm
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
    <>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}>
        <CardHeader
          title={post.title}
          subheader={
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationIcon color="action" sx={{ fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                {post.location || "מיקום לא צוין"}
              </Typography>
            </Stack>
          }
        />
        <Divider />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>

          {isLoggedIn && (
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                {post.contactInfo?.phone && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon color="action" sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {post.contactInfo.phone}
                    </Typography>
                  </Stack>
                )}
                {post.contactInfo?.email && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon color="action" sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {post.contactInfo.email}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          )}

          {!isLoggedIn && (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{ mt: 2 }}
              fullWidth
            >
              התחבר כדי ליצור קשר
            </Button>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <LikeButton post={post} />
          
          {fromPersonalArea && (
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => navigate("/post/edit", { state: { post } })}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleDeleteClick}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          האם את בטוחה שברצונך למחוק את המודעה?
        </DialogTitle>
        <DialogContent>
          <Typography>
            פעולה זו אינה ניתנת לביטול.
    //hjbvfjncmds,x
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
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
    //hbfjnemds
  );
}
