import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../services/localstorage";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = getFromLocalStorage<string>("userLogin");
    setIsLoggedIn(!!token && !!user);
  }, []);

  const handleLogout = () => {
    // ניקוי מלא של ה־localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    setIsLoggedIn(false);

    // מעבר אוטומטי לעמוד הראשי
    navigate("/", { replace: true });
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ width: "100%" }}>
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
              <Button color="inherit" component={Link} to="/my-posts">
                ההודעות שלי
              </Button>
              <Button color="inherit" component={Link} to="/add-post">
                הוספת מודעה
              </Button>
            </>
          )}
        </div>

        {/* התחברות / התנתקות */}
        <div>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
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
