import React, { createContext, ReactNode, useReducer } from "react";

type State = {
  isHost: boolean;
  userName: string;
  userNameList: string[];
};

type Action =
  | { type: `SWITCH_TO_HOST` }
  | { type: `SET_USER_NAME`; payload: string }
  | { type: `SET_USER_NAME_LIST`; payload: string[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case `SWITCH_TO_HOST`:
      return { ...state, isHost: true };
    case `SET_USER_NAME`:
      return { ...state, userName: action.payload };
    case `SET_USER_NAME_LIST`:
      return { ...state, userNameList: action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);

const defaultState: State = {
  isHost: false,
  userName: "",
  userNameList: [],
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
