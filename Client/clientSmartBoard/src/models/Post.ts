interface Post {
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

interface PostCardProps {
  post: Post;
  isLoggedIn?: boolean;
}