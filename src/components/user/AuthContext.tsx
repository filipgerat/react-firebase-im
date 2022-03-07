import React, { useState, useEffect, createContext } from "react";
import User from "../../data/User";

interface IAuthContext {
  user: User | null;
}

const defaultState = {
  user: null,
};

const AuthContext = createContext<IAuthContext>(defaultState);

export default AuthContext;
