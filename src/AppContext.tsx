import React from "react";
import { UserRepository } from "./data/UserRepository";
import { FirebaseUserRepository } from "./external/FirebaseUserRepository";

interface IAppContext {
  userRepository: UserRepository;
}

export const providers = {
  userRepository: new FirebaseUserRepository(),
};

export const AppContext = React.createContext<IAppContext>(providers);

export default AppContext;
