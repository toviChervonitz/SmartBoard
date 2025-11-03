// import { useEffect, useState } from "react";
// import { Container, Typography, CircularProgress } from "@mui/material";
// import PostCard from "../components/PostCard";
// import { getPostById } from "../services/api";
// import type { Post } from "../models/Post";
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
//                 const data = await getPostById(userId);
//                 console.log("data" + data);
//                 setPosts(data);
//             } catch (err:any) {
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
//             <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
//                 <CircularProgress />
//             </Container>
//         );

//     if (error)
//         return (
//             <Container sx={{ mt: 4 }}>
//                 <Typography color="error" variant="body1">
//                     {error}
//                 </Typography>
//             </Container>
//         );

//     return (
//         <Container sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 המודעות שלי
//             </Typography>
//             {posts.length > 0 ? (
//                 posts.map((p) => <PostCard key={p._id} post={p} isLoggedIn={true} fromPersonalArea={true} onDelete={handleDelete} />)
//             ) : (
//                 <Typography color="text.secondary">אין לך כרגע מודעות באזור האישי</Typography>
//             )
//             }
//         </Container >
//     );
// }
import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";
import { getPostById } from "../services/api";
import type { Post } from "../models/Post";
import { getUserFromToken, isLoggedIn } from "../services/auth";

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = getUserFromToken();
  const userId = user?.id || null;

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  useEffect(() => {
    if (!userId || !isLoggedIn()) {
      setError("משתמש לא מזוהה או שה-token פג. אנא התחבר מחדש.");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await getPostById(userId);
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
  }, [userId]);

  if (loading)
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        המודעות שלי
      </Typography>
      {posts.length > 0 ? (
        posts.map((p) => (
          <PostCard
            key={p._id}
            post={p}
            isLoggedIn={true}
            fromPersonalArea={true}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <Typography color="text.secondary">
          אין לך כרגע מודעות באזור האישי
        </Typography>
      )}
    </Container>
  );
}
