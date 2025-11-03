import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { getFromLocalStorage } from '../services/localstorage';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const user = getFromLocalStorage<any>('userLogin');
  const isLoggedIn = Boolean(user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            SmartBoard
          </Typography>
          
          <Button color="inherit" component={Link} to="/">
            כל המודעות
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/my-posts">
                המודעות שלי
              </Button>
              <Button color="inherit" component={Link} to="/add-post">
                הוספת מודעה
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              התחברות
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
      
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} SmartBoard. כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
}