import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Alert,
  Box,
  Skeleton,
  TextField,
  InputAdornment
} from "@mui/material";
import { Grid, Search as SearchIcon } from "@mui/icons-material";
import PostCard from "../components/PostCard";
import { getFromLocalStorage } from "../services/localstorage";
import { getPosts } from "../services/api";
import type { Post } from "../models/Post";

export default function PublicPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = getFromLocalStorage<string>("userLogin");
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("לא ניתן לטעון את המודעות כרגע. נסו שוב מאוחר יותר.");
      })
      .finally(() => setLoading(false));
  }, []);

  // חיפוש
  useEffect(() => {
    const filtered = posts.filter((post) =>
      [post.title, post.content, post.location]
        .some(field =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  // מצב טעינה
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4 
        }}>
          <Skeleton variant="text" width="200px" height={60} />
          <Box sx={{ width: '100%', maxWidth: '600px', mt: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: "1200px", width: "100%" }}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Grid item xs={12} sm={6} md={4} key={n}>
                  <Paper 
                    sx={{ 
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={120} sx={{ my: 2 }} />
                    <Skeleton variant="text" width="20%" />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }

  // מצב שגיאה
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  // מצב רגיל
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 6,
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "primary.main",
          }}
        >
          כל המודעות
        </Typography>

        <TextField
          placeholder="חיפוש מודעות..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: { sm: 300 }, alignSelf: "center" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredPosts.length > 0 ? (
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredPosts.map((post) => (
              <Box key={post._id} sx={{ height: "100%" }}>
                <PostCard post={post} isLoggedIn={isLoggedIn} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: "medium" }}
          >
            {searchTerm
              ? "לא נמצאו מודעות התואמות את החיפוש שלך"
              : "אין מודעות להצגה כרגע"}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
