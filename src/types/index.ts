import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface FormData {
  username: string;
  password: string;
}

export interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface PostCardProps {
  card: CardInterface;
}

export interface CardCommentInterface {
  id: string;
  message: string;
  userId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}

export interface CardInterface {
  id: string;
  userId: string;
  message: string;
  image: string | null;
  imagePath: string | null;
  likeUsers: string[];
  comments: CardCommentInterface[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
