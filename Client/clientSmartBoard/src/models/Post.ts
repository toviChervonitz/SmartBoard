export interface Post {
  _id: string;
  title: string;
  content: string;
  location: string;
  category: string;
  userId: string;
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

export interface User {
  userId: string;
  favoritesIds?: string[];
}

export interface favoritePost {
  postId: string;
  userId: string;
  liked?: boolean;
  likes?: number;
}