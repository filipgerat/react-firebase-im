import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import roomsReducer from "./components/room/roomsSlice"
import Loading from "./components/Loading";
import AppContext from "./AppContext";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<EnhancedStore>();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const store = configureStore({
      reducer: {
        rooms: roomsReducer
      },
      middleware: [thunk.withExtraArgument({ appContext })],
    });
    setStore(store);
  }, [appContext]);

  if (!store) {
    return <Loading />;
  }

  return <Provider store={store}>{children}</Provider>;
};
