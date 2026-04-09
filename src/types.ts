export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
  createdAt?: number;
}
