import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/auth.css';

interface User {
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // <-- כאן

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>(
        'http://localhost:3000/api/auth/login',
        { email, password }
      );

      // שמירת טוקן ומשתמש בלוקל סטורג'
      localStorage.setItem('token', data.token);
      localStorage.setItem('userLogin', JSON.stringify(data.user));

      alert(`ברוך הבא ${data.user.name}`);
      
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('שגיאה בהתחברות');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>התחברות</h2>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={handleEmailChange}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={handlePasswordChange}
        required
        className="input"
      />
      <button type="submit" className="button">התחבר</button>

      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        אין לך חשבון?{' '}
        <Link to="/register" style={{ color: '#4CAF50', textDecoration: 'none' }}>
          הרשם כאן
        </Link>
      </p>
    </form>
  );
}
