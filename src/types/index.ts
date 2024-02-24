export interface FormData {
  username: string;
  password: string;
}

export interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}
