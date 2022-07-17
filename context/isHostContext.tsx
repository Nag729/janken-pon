import React, { createContext, ReactNode, useReducer } from "react";

type State = {
  isHost: boolean;
};

type Action = {
  type: "SWITCH_TO_HOST";
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SWITCH_TO_HOST":
      return {
        ...state,
        isHost: true,
      };
    default:
      return state;
  }
};

export const IsHostContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);

const defaultState = {
  isHost: false,
};

export const IsHostProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <IsHostContext.Provider value={{ state, dispatch }}>
      {children}
    </IsHostContext.Provider>
  );
};
