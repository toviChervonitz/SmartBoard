import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    IconButton,
    InputBase,
    ClickAwayListener,
    Collapse,
    Paper,
    Stack,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import PostCard from "../components/PostCard";
import { getFromLocalStorage } from "../services/localstorage";
import { getPosts } from "../services/api";

export default function PublicPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    // טעינה ראשונית של כל המודעות
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await getPosts();
                setPosts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // סינון לפי כותרת/עיר עם debounce
    useEffect(() => {
        const t = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await getPosts(q);
                setPosts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(t);
    }, [q]);

    const user = getFromLocalStorage<string>("userLogin");
    const isLoggedIn = !!user;

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
            <Typography variant="h4" gutterBottom>
                כל המודעות
            </Typography>

            {/* חיפוש מתקפל קבוע בצד שמאל של המסך */}
            <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                <Paper
                    elevation={3}
                    sx={{
                        position: "fixed",
                        left: 16,
                        top: 100, // התאימי לפי גובה ה־Header שלך
                        zIndex: 2000,
                        display: "flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.5,
                        borderRadius: 99,
                        bgcolor: "background.paper",
                    }}
                >
                    <IconButton
                        aria-label="חיפוש"
                        onClick={() => setSearchOpen((v) => !v)}
                        size="small"
                    >
                        <SearchIcon />
                    </IconButton>

                    <Collapse in={searchOpen} orientation="horizontal" unmountOnExit>
                        <InputBase
                            autoFocus
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="חיפוש לפי כותרת או עיר…"
                            inputProps={{ dir: "rtl" }}
                            sx={{ minWidth: 220, px: 1 }}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") setSearchOpen(false);
                            }}
                        />
                    </Collapse>

                    {searchOpen && (
                        <IconButton
                            aria-label="סגירה"
                            onClick={() => {
                                setQ("");
                                setSearchOpen(false);
                            }}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Paper>
            </ClickAwayListener>

            {/* רשימה בלי Grid – עמודה אחת, ריווח עקבי */}
            <Box sx={{ mt: 3 }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={3}>
                        {posts.map((p) => (
                            <PostCard key={p._id} post={p} isLoggedIn={isLoggedIn} />
                        ))}
                    </Stack>
                )}
            </Box>
        </Container>
    );
}