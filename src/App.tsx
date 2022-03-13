import React from "react";

import AppContext, { providers } from "./AppContext";
import Navigation from "./components/Navigation";
import AuthProvider from "./components/user/AuthProvider";
import { StoreProvider } from "./StoreProvider";

export default function App() {
  return (
    <AppContext.Provider value={providers}>
      <StoreProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </StoreProvider>
    </AppContext.Provider>
  );
}
