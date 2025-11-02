export interface Post {
  _id: string;
  title: string;
  content: string;
  location: string;
  category: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  likes?: number;
}

export interface PostCardProps {
  post: Post;
  isLoggedIn?: boolean;
  fromPersonalArea?: boolean;
  onDelete?: (id: string) => void;
}