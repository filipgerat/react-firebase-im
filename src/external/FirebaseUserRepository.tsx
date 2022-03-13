
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
  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log("Logged in", userCredential)
    } catch (e) {
      console.error("Failed to login", e)
    }
  }
  async logout() {
    return auth().signOut();
  };
}