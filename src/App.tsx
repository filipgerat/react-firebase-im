import React from "react";

import { StyleSheet, Text, View } from 'react-native';
import AppContext, { providers } from "./AppContext";
import Navigation from "./components/Navigation";
import AuthProvider from "./components/user/AuthProvider";


export default function App() {
  return (
    <AppContext.Provider value={providers}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </AppContext.Provider>
  );
}
