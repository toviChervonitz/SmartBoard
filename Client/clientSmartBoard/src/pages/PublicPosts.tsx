import { useEffect, useState } from "react";
import {
    Container, Typography,
    Grid as MuiGrid, Paper, Alert, Box, Skeleton,
    TextField, InputAdornment
} from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import PostCard from "../components/PostCard";
import { getFromLocalStorage } from "../services/localstorage";
import { getPosts } from "../services/api";
import type { Post } from "../models/Post";

export default function PublicPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    //trybvfjh
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

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
    //trybvfjh

    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    const user = getFromLocalStorage<string>('userLogin');
    const isLoggedIn = Boolean(user);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Skeleton variant="text" width="30%" height={60} />
                    <Skeleton variant="rectangular" height={56} sx={{ mt: 2 }} />
                </Box>
                <MuiGrid container spacing={3}>
                    {[1, 2, 3, 4].map((n) => (
                        <MuiGrid item xs={12} md={6} key={n}>
                            <Paper sx={{ p: 3 }}>
                                <Skeleton variant="text" width="60%" height={40} />
                                <Skeleton variant="text" width="40%" />
                                <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
                                <Skeleton variant="text" width="20%" />
                            </Paper>
                        </MuiGrid>
                    ))}
                </MuiGrid>
            </Container>
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
    const isLoggedIn = user ? true : false;
    //trybvfjh

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                mb: 4,
                gap: 2
            }}>
                <Typography variant="h4" component="h1">
                    כל המודעות
                </Typography>
                <TextField
                    placeholder="חיפוש מודעות..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ maxWidth: { sm: 300 } }}
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
                <MuiGrid container spacing={3}>
                    {filteredPosts.map((post) => (
                        <MuiGrid item xs={12} md={6} key={post._id}>
                            <PostCard
                                post={post}
                                isLoggedIn={isLoggedIn}
                            />
                        </MuiGrid>
                    ))}
                </MuiGrid>
            ) : (
                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: 'background.default'
                }}>
                    <Typography color="text.secondary">
                        {searchTerm
                            ? "לא נמצאו מודעות התואמות את החיפוש שלך"
                            : "אין מודעות להצגה כרגע"}
                    </Typography>
                </Paper>
            )}
        </Container>
    );
}
