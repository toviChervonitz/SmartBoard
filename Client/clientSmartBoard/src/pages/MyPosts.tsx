// import { useEffect, useState } from "react";
// import { Container, Typography, CircularProgress, Stack } from "@mui/material";
// import PostCard from "../components/PostCard";
// import { getPostById } from "../services/api";
// import type { Post } from "../models/Post";
// import { getPostsByUser } from "../services/api";
// import { getFromLocalStorage } from '../services/localstorage'

// export default function MyPosts() {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const user = getFromLocalStorage<any>('userLogin');
//     console.log("user:", user);
//     const userId = user?.id || null;
//     console.log(userId + "userId");


//     const handleDelete = (id: string) => {
//         setPosts((prev) => prev.filter((p) => p._id !== id)); // ✅ מסיר מהמסך בלי רענון
//     };

//     useEffect(() => {
//         if (!userId) {
//             setError("משתמש לא מזוהה. אנא התחבר מחדש.");
//             setLoading(false);
//             return;
//         }
//         const fetchPosts = async () => {
//             try {
//                 const data = await getPostsByUser(userId);
//                 console.log("data" + data);
//                 setPosts(data);
//             } catch (err: any) {
//                 console.error("❌ שגיאה בקבלת פוסטים:", err);
//                 if (err.response && err.response.status === 404) {
//                     setPosts([]);
//                 } else {
//                     setError("לא ניתן לטעון את המודעות מהשרת.");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     if (loading)
//         return (
//             <Container maxWidth="md" sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
//                 <CircularProgress />
//             </Container>
//         );

//     if (error)
//         return (
//             <Container maxWidth="md" sx={{ mt: 4 }}>
//                 <Typography color="error" variant="body1">
//                     {error}
//                 </Typography>
//             </Container>
//         );

//     return (
//         <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
//             <Typography variant="h4" gutterBottom>
//                 המודעות שלי
//             </Typography>
//             <Stack spacing={2}>
//                 {posts.length > 0 ? (
//                     posts.map((p) => <PostCard key={p._id} post={p} isLoggedIn={true} fromPersonalArea={true} onDelete={handleDelete} />)
//                 ) : (
//                     <Typography color="text.secondary">אין לך כרגע מודעות באזור האישי</Typography>
//                 )}
//             </Stack>
//         </Container>
//     );
// }
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Skeleton
} from "@mui/material";
import PostCard from "../components/PostCard";
import { getPostsByUser } from "../services/api";
import type { Post } from "../models/Post";
import { getFromLocalStorage } from "../services/localstorage";

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = getFromLocalStorage<any>("userLogin");
  const userId = user?.id || null;

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  useEffect(() => {
    if (!userId) {
      setError("משתמש לא מזוהה. אנא התחבר מחדש.");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await getPostsByUser(userId);
        setPosts(data);
      } catch (err: any) {
        console.error("❌ שגיאה בקבלת פוסטים:", err);
        if (err.response && err.response.status === 404) {
          setPosts([]);
        } else {
          setError("לא ניתן לטעון את המודעות מהשרת.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // מצב טעינה עם Skeleton
  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          width: "100%",
          pt: { xs: 12, sm: 14 },
          pb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 8,
            }}
          >
            <Skeleton variant="text" width="250px" height={72} sx={{ mb: 4 }} />
          </Box>

          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 4,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Paper
                  key={n}
                  sx={{
                    p: 3,
                    height: "380px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Skeleton variant="text" width="70%" height={32} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton
                    variant="rectangular"
                    height={180}
                    sx={{ my: 2, borderRadius: 1 }}
                  />
                  <Box sx={{ mt: "auto" }}>
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="30%" />
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
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
    <Box
      sx={{
        flex: 1,
        width: "100%",
        pt: { xs: 12, sm: 14 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 8,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
            }}
          >
            המודעות שלי
          </Typography>
        </Box>

        {posts.length > 0 ? (
          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 4,
                "& .post-card": {
                  height: "100%",
                  display: "flex",
                  "& > *": {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  },
                },
              }}
            >
              {posts.map((p) => (
                <Box
                  key={p._id}
                  className="post-card"
                  sx={{
                    minHeight: "300px",
                    transform: "translateY(0)",
                    transition: "all 0.3s ease-in-out",
                    "& .MuiCard-root": {
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      height: "100%",
                    },
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .MuiCard-root": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                    },
                  }}
                >
                  <PostCard
                    post={p}
                    isLoggedIn={true}
                    fromPersonalArea={true}
                    onDelete={handleDelete}
                  />
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
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: "medium" }}
            >
              אין לך כרגע מודעות באזור האישי
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
