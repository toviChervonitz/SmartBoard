// import { useEffect, useState } from "react";
// import { Container, Typography, CircularProgress } from "@mui/material";
// import PostCard from "../components/PostCard";
// import { getAllPosts } from "../services/postsService";

// export default function PublicPosts() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllPosts()
//       .then((data) => setPosts(data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <CircularProgress />;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         כל המודעות
//       </Typography>
//       {posts.map((p) => (
//         <PostCard key={p._id} post={p} />
//       ))}
//     </Container>
//   );
// }
import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";

export default function PublicPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // כאן במקום בקשת axios נשתמש בנתונים מדומים
    const mockData = [
      {
        _id: "1",
        title: "דירה להשכרה בתל אביב",
        content: "3 חדרים מרוהטים, קומה 2, קרוב לים",
        location: "תל אביב",
        contactInfo: { phone: "050-1234567", email: "example1@gmail.com" },
        likes: 5,
      },
      {
        _id: "2",
        title: "מכירת מחשב נייד",
        content: "Dell XPS במצב מצוין, מחיר גמיש",
        location: "ירושלים",
        contactInfo: { phone: "052-7654321", email: "example2@gmail.com" },
        likes: 3,
      },
      {
        _id: "3",
        title: "מחפשת שותפה לדירה",
        content: "דירה מקסימה במרכז חיפה, כניסה מיידית",
        location: "חיפה",
        contactInfo: { phone: "053-9876543", email: "example3@gmail.com" },
        likes: 10,
      },
    ];

    setTimeout(() => {
      setPosts(mockData);
      setLoading(false);
    }, 1000); // רק כדי לדמות טעינה
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        כל המודעות
      </Typography>
      {posts.map((p) => (
        <PostCard key={p._id} post={p} isLoggedIn={false} />
      ))}
    </Container>
  );
}
