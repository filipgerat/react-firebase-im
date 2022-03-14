import React, {
  PropsWithChildren, useContext, useEffect, useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthContext from "./AuthContext";
import { listenToAuthChanges, selectUser, selectUserStatus } from "./userSlice";

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);

  useEffect(() => {
    dispatch(listenToAuthChanges())
  }, [])

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  );
}
