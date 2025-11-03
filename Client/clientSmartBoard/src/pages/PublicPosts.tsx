// import { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Box,
//   IconButton,
//   InputBase,
//   ClickAwayListener,
//   Collapse,
//   Paper,
//   Stack,
// } from "@mui/material";
// import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
// import PostCard from "../components/PostCard";
// import { getFromLocalStorage } from "../services/localstorage";
// import { getPosts } from "../services/api";

// export default function PublicPosts() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [q, setQ] = useState("");
//   const [searchOpen, setSearchOpen] = useState(false);

//   // טעינה ראשונית של כל המודעות
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const data = await getPosts();
//         setPosts(data);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // סינון לפי כותרת/עיר עם debounce
//   useEffect(() => {
//     const t = setTimeout(async () => {
//       try {
//         setLoading(true);
//         const data = await getPosts(q);
//         setPosts(data);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [q]);

//   const user = getFromLocalStorage<string>("userLogin");
//   const isLoggedIn = !!user;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
//       <Typography variant="h4" gutterBottom>
//         כל המודעות
//       </Typography>

//       {/* חיפוש מתקפל קבוע בצד שמאל של המסך */}
//       <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
//         <Paper
//           elevation={3}
//           sx={{
//             position: "fixed",
//             left: 16,
//             top: 100, // התאימי לפי גובה ה־Header שלך
//             zIndex: 2000,
//             display: "flex",
//             alignItems: "center",
//             px: 1,
//             py: 0.5,
//             borderRadius: 99,
//             bgcolor: "background.paper",
//           }}
//         >
//           <IconButton
//             aria-label="חיפוש"
//             onClick={() => setSearchOpen((v) => !v)}
//             size="small"
//           >
//             <SearchIcon />
//           </IconButton>

//           <Collapse in={searchOpen} orientation="horizontal" unmountOnExit>
//             <InputBase
//               autoFocus
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="חיפוש לפי כותרת או עיר…"
//               inputProps={{ dir: "rtl" }}
//               sx={{ minWidth: 220, px: 1 }}
//               onKeyDown={(e) => {
//                 if (e.key === "Escape") setSearchOpen(false);
//               }}
//             />
//           </Collapse>

//           {searchOpen && (
//             <IconButton
//               aria-label="סגירה"
//               onClick={() => {
//                 setQ("");
//                 setSearchOpen(false);
//               }}
//               size="small"
//             >
//               <CloseIcon />
//             </IconButton>
//           )}
//         </Paper>
//       </ClickAwayListener>

//       {/* רשימה בלי Grid – עמודה אחת, ריווח עקבי */}
//       <Box sx={{ mt: 3 }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Stack spacing={3}>
//             {posts.map((p) => (
//               <PostCard key={p._id} post={p} isLoggedIn={isLoggedIn} />
//             ))}
//           </Stack>
//         )}
//       </Box>
//     </Container>
//   );
// }
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import PostCard from "../components/PostCard";
import { getFromLocalStorage } from "../services/localstorage";
import { getPosts } from "../services/api";
import type { Post } from "../models/Post";

export default function PublicPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = getFromLocalStorage<string>("userLogin");
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("לא ניתן לטעון את המודעות כרגע. נסו שוב מאוחר יותר.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // חיפוש
  const filteredPosts = posts.filter((post) =>
    q ? [post.title, post.content, post.location]
      .filter(Boolean)
      .some(field => field.toLowerCase().includes(q.toLowerCase()))
    : true
  );


 if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%',
          pt: { xs: 12, sm: 14 },
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 8
          }}>
            <Skeleton variant="text" width="250px" height={72} sx={{ mb: 4 }} />
            <Box sx={{ width: '100%', maxWidth: '600px' }}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={56} 
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Box>
          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 8
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Paper 
                  key={n}
                  sx={{ 
                    p: 3,
                    height: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  <Skeleton variant="text" width="70%" height={32} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton 
                    variant="rectangular" 
                    height={180} 
                    sx={{ my: 2, borderRadius: 1 }} 
                  />
                  <Box sx={{ mt: 'auto' }}>
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        pt: { xs: 12, sm: 50 }, 
        pb: 8
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
            color: "primary.main"
          }}
        >
          כל המודעות
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2
            }}
          >
            <SearchIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="חפש לפי כותרת או עיר..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
                backgroundColor: 'transparent'
              }}
            />
            {q && (
              <IconButton
                size="small"
                onClick={() => setQ("")}
                sx={{ ml: 1 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Paper>
        </Box>
      </Box>

      {filteredPosts.length > 0 ? (
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 6,
              '& .post-card': {
                height: '100%',
                display: 'flex',
                '& > *': {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }
              }
            }}
          >
            {filteredPosts.map((post: Post) => (
              <Box 
                key={post._id} 
                className="post-card"
                sx={{
                  minHeight: '300px',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease-in-out',
                  '& .MuiCard-root': {
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    height: '100%'
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .MuiCard-root': {
                      borderColor: 'primary.main',
                      borderWidth: '1px'
                    }
                  }
                }}
              >
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
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: "medium" }}
          >
            אין מודעות להצגה כרגע
          </Typography>
        </Paper>
      )}
    </Container>
    </Box>
  );
}