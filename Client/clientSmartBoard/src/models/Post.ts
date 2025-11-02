export interface Post {
  _id: string;
  title: string;
  content: string;
  location: string;
<<<<<<< HEAD
  
=======
  category: string;
>>>>>>> 6f5732ae7854cc2c3086070e3ef664f59369546c
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