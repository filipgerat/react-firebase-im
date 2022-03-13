import User from "./User";

export interface UserRepository {
  getCurrentUser: () => User | null;
  onAuthStateChanged: (callback: (user: User | null) => void) => void;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

