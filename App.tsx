import React from 'react';
import HomeScreen from './src/components/home/HomeScreen';
import { UserRepository } from './src/data/UserRepository';
import { FirebaseUserRepository } from './src/external/FirebaseUserRepository';

interface IAppContext {
  userRepository: UserRepository
}

const providers = {
  userRepository: new FirebaseUserRepository()
}

export const AppContext = React.createContext<IAppContext>(providers);

export default function App() {
  
  return (
    <AppContext.Provider value={providers}>
      <HomeScreen></HomeScreen>
    </AppContext.Provider>
  );
}
