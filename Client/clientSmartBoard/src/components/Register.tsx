import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/auth.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate(); // <-- כאן

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // שליחת הנתונים לשרת
      const { data } = await axios.post('http://localhost:3000/api/auth/register', form);

      // אחרי הרשמה — התחברות אוטומטית
      const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
        email: form.email,
        password: form.password,
      });

      // שמירת טוקן ומשתמש בלוקל סטורג'
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('userLogin', JSON.stringify(loginRes.data.user));

      alert(`נרשמת בהצלחה! ברוך הבא ${loginRes.data.user.name}`);

      // ניווט ל-publicPosts
      navigate('/publicPosts');
    } catch (error) {
      console.error(error);
      alert('שגיאה בהרשמה. ייתכן שהאימייל כבר רשום.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>הרשמה</h2>
      <input
        type="text"
        name="name"
        placeholder="שם מלא"
        value={form.name}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="אימייל"
        value={form.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="tel"
        name="phone"
        placeholder="טלפון (לא חובה)"
        value={form.phone}
        onChange={handleChange}
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="סיסמה"
        value={form.password}
        onChange={handleChange}
        required
        className="input"
      />
      <button type="submit" className="button">הרשם</button>
      <p>
        כבר רשום? <Link to="/login">התחבר כאן</Link>
      </p>
    </form>
  );
}
