import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../services/localstorage";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getFromLocalStorage<string>('userLogin');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <AppBar position="fixed" color="primary" sx={{ width: '100%' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* כותרת האתר */}
        <Typography variant="h6" component="div">
          לוח חכם
        </Typography>

        {/* קישורים */}
        <div>
          <Button color="inherit" component={Link} to="/">
            כל ההודעות
          </Button>

          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/myPosts">
                ההודעות שלי
              </Button>
              <Button color="inherit" component={Link} to="/add-post">
                הוספת מודעה
              </Button>
            </>
          )}
        </div>

        {/* התחברות/התנתקות */}
        <div>
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              התנתקות
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              התחברות
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>

  );
}