import axios from "axios";

const API_URL = "http://localhost:5000/api/posts"; // תעדכני לפי השרת שלך

export const getAllPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
