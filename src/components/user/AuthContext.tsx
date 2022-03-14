import React, { useState, useEffect, createContext } from "react";
import { Status } from "../../constants";
import User from "../../data/User";

interface IAuthContext {
  user: User | null;
  status: Status;
}

const defaultState: IAuthContext = {
  user: null,
  status: 'idle'
};

const AuthContext = createContext<IAuthContext>(defaultState);

export default AuthContext;
