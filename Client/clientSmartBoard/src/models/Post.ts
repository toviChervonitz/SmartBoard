export interface Post {
  _id: string;
  title: string;
  content: string;
  location: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  likes?: number;
}

export interface PostCardProps {
  post: Post;
  isLoggedIn?: boolean;
}