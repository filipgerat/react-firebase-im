
import auth from "@react-native-firebase/auth";
import User from "../data/User";
import { UserRepository } from "../data/UserRepository";

export class FirebaseUserRepository implements UserRepository {
  getCurrentUser() {
    const user = auth().currentUser;
    return user;
  }
  onAuthStateChanged(callback: (user: User | null) => void) {
    return auth().onAuthStateChanged(callback);
  }
}