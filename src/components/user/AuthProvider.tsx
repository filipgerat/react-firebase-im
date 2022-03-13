import React, {
  PropsWithChildren, useContext, useState,
} from "react";
import AppContext from "../../AppContext";
import User from "../../data/User";

import AuthContext from "./AuthContext";

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const { userRepository } = useContext(AppContext);

  const [user, setUser] = useState<User | null>(userRepository.getCurrentUser());

  userRepository.onAuthStateChanged((user) => setUser(user));

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
