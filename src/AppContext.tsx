import React from "react";
import { RoomRepository } from "./data/RoomRepository";
import { UserRepository } from "./data/UserRepository";
import FirebaseRoomRepository from "./external/FirebaseRoomRepository";
import { FirebaseUserRepository } from "./external/FirebaseUserRepository";

interface IAppContext {
  userRepository: UserRepository;
  roomRepository: RoomRepository;
}

export const providers = {
  userRepository: new FirebaseUserRepository(),
  roomRepository: new FirebaseRoomRepository()
};

export const AppContext = React.createContext<IAppContext>(providers);

export default AppContext;
