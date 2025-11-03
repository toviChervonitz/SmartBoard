import axios from "axios";
import type { Post } from "../models/Post";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ה-API של השרת
});

// services/api.ts
export async function getPosts(q?: string) {
  const params = q?.trim() ? { q: q.trim() } : undefined;
  const res = await API.get("/posts", { params });   // ← לא לבנות URL ידנית
  return res.data;
}



export const getPostById = async (postId: string): Promise<Post> => {
  const res = await API.get(`/posts/${postId}`);
  return res.data;
};

export const createPost = async (postData: Post): Promise<Post> => {
  const res = await API.post("/posts", postData);
  return res.data;
};

export const getPostsByUser = async (userId: string) => {
  const res = await API.get(`/posts/user/${userId}`);
  return res.data;
};

export const deletePost = async (postId: string): Promise<{ message: string }> => {
  const res = await API.delete(`/posts/${postId}`);
  return res.data;
};

export const updatePost = async (postId: string, updatedData: Partial<Post>): Promise<Post> => {
  const res = await API.put(`/posts/${postId}`, updatedData);
  return res.data;
};

export default API;
